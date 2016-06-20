package com.lch.aaa

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import org.grails.core.io.DefaultResourceLocator
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.EnvironmentAware
import org.springframework.core.env.Environment
import org.springframework.core.env.MapPropertySource

//@Import([
//	class ...
//])

//@ImportResource([
//	"classpath:META-INF/xml" ...
//])

@ComponentScan(basePackages=[
	'com.lch.aaa',
	'com.lch.cces'
])

// test failed:
//@EntityScan(
//	basePackages=[
//		'com.lch.cces'
//	],
//	basePackageClasses=[
//		Function
//	]
//)

@EnableAutoConfiguration
@Configuration
class Application extends GrailsAutoConfiguration implements EnvironmentAware {

	public static final String NAMESPACE_DEFAULT = 'cces'
	public static final String NAMESPACE_API = 'api'

	public static final String PARAMETER_TARGET_URL = '_tu_'

	public static final String PAGE_HOME = '/'
	public static final String PAGE_WELCOME = '/welcome'
	public static final String PAGE_LOGIN = '/login'
	public static final String PAGE_EXPIRED = PAGE_LOGIN+'?expired'
	public static final String PAGE_LOGOUT = '/logout'
	public static final String PAGE_PASSWORD = '/changePassword'
	public static final String PAGE_DENY = '/deny'
	public static final String PAGE_NOTFOUND = '/notfound'
	public static final String PAGE_ERROR = '/errors'
	public static final String PAGE_MAINTENANCE = '/maintain'
	// public static final String PAGE_SIGNUP = '/signup'
	// public static final String PAGE_ABOUT = '/about'

	public static final String[] PAGES_PERMITTED = [ // excludes: login and logout
		PAGE_HOME, PAGE_PASSWORD, PAGE_DENY, PAGE_NOTFOUND, PAGE_ERROR, PAGE_MAINTENANCE
		// TODO: , PAGE_SIGNUP, PAGE_ABOUT
	]

	static void main(String[] args) {
		// for v3.0:
		// GrailsApp.run(Application, args)
		// for v3.1:
		def app = new GrailsApp(Application) {
			@Override
			protected void printBanner(org.springframework.core.env.Environment environment) {
				println '''
	▄████████  ▄████████    ▄████████    ▄████████
	███    ███ ███    ███   ███    ███   ███    ███
	███    █▀  ███    █▀    ███    █▀    ███    █▀
	███        ███         ▄███▄▄▄       ███
	███        ███        ▀▀███▀▀▀     ▀███████████
	███    █▄  ███    █▄    ███    █▄           ███
	███    ███ ███    ███   ███    ███    ▄█    ███
	████████▀  ████████▀    ██████████  ▄████████▀
'''
			}
		}
		app.run(args)
	}

    public static ConfigObject loadConfiguration(String configFile) { //, grails.util.Environment env = null) {
    	// parse(new ClassPathResource(configFile).URL)
		def location = System.getProperty('app.config.location', 'classpath:.') + '/' + configFile
		def resource = new DefaultResourceLocator().findResourceForURI(location)
		def config = resource ? new ConfigSlurper(/*env ? env.name : grails.util.Environment.current.name*/).parse(resource.getURL()) : [:]
		return config
	}

	@Override
	void setEnvironment(org.springframework.core.env.Environment environment) {
		def config = loadConfiguration('application.groovy')
		println "config file : ${config.configFile}"
		environment.propertySources.addFirst(new MapPropertySource(config.configFile.toString(), config))
	}
}
