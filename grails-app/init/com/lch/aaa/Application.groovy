package com.lch.aaa

import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration
import grails.util.Environment
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
	// public static final String PAGE_MONITOR = '/mon'

	public static final String[] PAGES_PERMITTED = [ // excludes: login and logout
		PAGE_HOME, PAGE_PASSWORD, PAGE_DENY, PAGE_NOTFOUND, PAGE_ERROR, PAGE_MAINTENANCE
		// TODO: , PAGE_SIGNUP, PAGE_ABOUT
	]

	static void main(String[] args) {
		// for v3.0:
		// GrailsApp.run(Application, args)
		// for v3.1:
		new GrailsApp(Application) {
			@Override
			protected void printBanner(org.springframework.core.env.Environment environment) {
				def configs = environment.propertySources.applicationConfigurationProperties
				println """
	▄████████  ▄████████    ▄████████    ▄████████
	███    ███ ███    ███   ███    ███   ███    ███
	███    █▀  ███    █▀    ███    █▀    ███    █▀
	███        ███         ▄███▄▄▄       ███
	███        ███        ▀▀███▀▀▀     ▀███████████
	███    █▄  ███    █▄    ███    █▄           ███
	███    ███ ███    ███   ███    ███    ▄█    ███
	████████▀  ████████▀    ██████████  ▄████████▀

	v${configs.getProperty('info.app.version')} based-on Grails v${configs.getProperty('info.app.grailsVersion')}"""
			}
		}.run(args)
	}

	private static String getConfigurationFolder() {
		def configDir = System.getProperty('app.config.location', System.properties['user.dir'])
		new File(configDir).mkdirs()
		return configDir
	}

    public static ConfigObject loadConfiguration(String configPath) { //, grails.util.Environment env = null) {
		def location = getConfigurationFolder() + '/' + configPath
		def configFile = new File(location)
		def isNew = ! configFile.exists()
		def resource = new DefaultResourceLocator().findResourceForURI(isNew ? ('classpath:./' + configPath) : 'file:' + location)
		def config = resource ? new ConfigSlurper(/*env ? env.name : grails.util.Environment.current.name*/).parse(resource.getURL()) : new ConfigObject()

		if (isNew) { // clone from default
			saveConfiguration(configPath, config)
		}
		return config
	}

	public static void saveConfiguration(String configPath, ConfigObject config) {
		new File(getConfigurationFolder() + '/' + configPath).withWriter { writer ->
			config.writeTo(writer)
		}
	}

	public static void saveConfiguration(String configPath, Map props) {
		def configNew = new ConfigObject()
		configNew.putAll(props?:[:])
		def config = loadConfiguration(configPath)
		config.merge(configNew)

		saveConfiguration(configPath, config)
	}

	@Override
	void setEnvironment(org.springframework.core.env.Environment environment) {
		def config = loadConfiguration('config.groovy')
		println "\nconfig : ${config.configFile}\n"
		environment.propertySources.addFirst(new MapPropertySource(config.configFile.toString(), config))
	}

}
