package com.lch.aaa

public class AuthenticationException extends Exception {

	private static final long serialVersionUID = -1L

	// public AuthenticationException() {
	// }
	
	public AuthenticationException(String msg) {
		super(msg)
	}
	
    public AuthenticationException(String message, Throwable cause) {
        super(message, cause)
    }
}
