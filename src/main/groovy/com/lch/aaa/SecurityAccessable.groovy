package com.lch.aaa

public interface SecurityAccessable {

	boolean canAccess(SecurityUser currentUser, def resources)
	boolean canAccess(SecurityUser currentUser)
}
