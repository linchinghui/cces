package com.lch.aaa

import org.slf4j.Logger
import org.slf4j.LoggerFactory

trait ClassNameless<T> {
	private static Logger log = LoggerFactory.getLogger(ClassNameless.class)
	
	def excludes = ['class'] // no classname by default
	
	T addExclude(def exclude) {
		excludes.add(exclude?.toString())
		excludes.toUnique()
		log.info "${this.class.simpleName} excluded fields : $excludes"
		return this
	}

	boolean isExclude(Object object, String property) {
		return property in excludes || ClassNameless.super.excludesProperty(object, property)
	}

}