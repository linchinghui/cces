package com.lch.aaa

import grails.transaction.Transactional

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.web.authentication.rememberme.PersistentRememberMeToken
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository

import com.lch.aaa.*;

@Transactional //(readOnly = true) // for DB accessing by spring-security
class SecurityService implements UserDetailsService, PersistentTokenRepository {

	/*
	 * UserDetailsService
	 */
	UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		loadUserByUsername username, true
	}

	// @Transactional(readOnly = true, noRollbackFor = [/*IllegalArgumentException,*/ UsernameNotFoundException])
	UserDetails loadUserByUsername(String username, boolean loadRoles) throws UsernameNotFoundException {
		def user = User.findWhere(username: username)

		if (!user) {
		    log.warn "User not found: $username"
		    throw new UsernameNotFoundException('User not found')
		}

		def authorities = (!loadRoles) ? [] :
			user.roles?.collect { role ->
				new SimpleGrantedAuthority(
					role.type.name() // DefaultRoleType's name
				)
			}

		return new SecurityUser(
			user.username,
			user.fullname,
			user.password, // encoded password
			user.enabled,
			! user.accountExpired,
			! user.accountLocked,
			! user.credentialsExpired,
			authorities ?: []
		)
	}

	/*
	 * PersistentTokenRepository
	 */
	@Override
	// @Transactional
	public void createNewToken(PersistentRememberMeToken token) {
		log.info "create user-logins: ${token.username}-${token.series}"

		new PersistentLogins(
			username: token.username,
			series: token.series,
			tokenValue: token.tokenValue,
			date: token.date
		).save(flush: true)

		removeUserTokensExceptSeries token.username, token.series
	}

	@Override
	// @Transactional
	public void updateToken(String series, String tokenValue, Date date) {
		def persistentLogins = PersistentLogins.findWhere(series: series)

		if (persistentLogins) {
			persistentLogins.tokenValue = tokenValue
			persistentLogins.date = date
			persistentLogins.save(flush: true)
		}
	}

	@Override
	public PersistentRememberMeToken getTokenForSeries(String seriesId) {
		def persistentLogins = PersistentLogins.where {
			series == seriesId
		}

		if (persistentLogins?.size() > 1) {
			log.error "Querying token for series $seriesId returned more than one value. Series should be unique."
		} else if (persistentLogins?.size() == 0) {
			log.debug "Querying token for series $seriesId returned no results."
		} else if (persistentLogins == null) {
			log.error "Failed to load token for series $seriesId"
		}

		def persistentLogin = persistentLogins[0]

		return (persistentLogin) ? new PersistentRememberMeToken(
				persistentLogin?.username,
				persistentLogin?.series,
				persistentLogin?.tokenValue,
				persistentLogin?.date
			) : null
	}

	@Override
	// @Transactional
	public void removeUserTokens(String userName) {
		removeUserTokensExceptSeries userName, null
	}

	// @Override
	// @Transactional
	protected void removeUserTokensExceptSeries(String userName, String seriesId) {
        log.debug "remove user-logins: $userName${seriesId ? ', except ['+seriesId+']': ''}"

		def persistentLogins = PersistentLogins.where {
			username == userName

			if (seriesId != null) {
				series != seriesId
			}
		}
		persistentLogins?.deleteAll()
	}

}
