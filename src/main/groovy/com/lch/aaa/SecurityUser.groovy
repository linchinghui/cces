package com.lch.aaa;

import groovy.transform.EqualsAndHashCode
import org.springframework.security.core.GrantedAuthority

@EqualsAndHashCode(includes='username')
public class SecurityUser extends org.springframework.security.core.userdetails.User {

	private static final long serialVersionUID = 1L
	private String _fullname

	public SecurityUser(
		String username,
		String fullname,
		String password,
		boolean enabled,
		boolean accountNonExpired,
		boolean accountNonLocked,
		boolean credentialsNonExpired,
		Collection<GrantedAuthority> authorities
	) {
     	super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities)
     	this._fullname = fullname
	}

	public String toString() {
		return _fullname
	}
}
