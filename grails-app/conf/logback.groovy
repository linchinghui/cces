// See http://logback.qos.ch/manual/groovy.html for details on configuration

// import java.nio.charset.Charset
import grails.util.BuildSettings
import grails.util.*
import org.grails.core.io.DefaultResourceLocator
import org.springframework.boot.logging.logback.*
import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.ConsoleAppender
import ch.qos.logback.core.FileAppender
import ch.qos.logback.core.rolling.RollingFileAppender
import static ch.qos.logback.classic.Level.*

def logPattern = '%date{yyyy/MM/dd HH:mm:ss.SSS} ' +
            	'%-5level ' +
                '[%thread] ' +
                '%-33logger{24} ' + // other format: %-24.33logger
                '- ' +
                '%msg%n'

def targetDir = BuildSettings.TARGET_DIR
def config = com.lch.aaa.Application.loadConfiguration('logging.groovy')


//---------- console ----------
appender('STDOUT', ConsoleAppender) {
  encoder(PatternLayoutEncoder) {
    // charset = Charset.forName('UTF-8')
    pattern = logPattern
  }
}

root(ERROR, ['STDOUT'])
// logger("BootStrap", DEBUG, ['STDOUT'], true)

//---------- for DEV ----------
if (Environment.isDevelopmentMode()) {
  // if (targetDir) {
    appender('FULL_STACKTRACE', FileAppender) { // RollingFileAppender
      file = "${targetDir}/stacktrace.log"
      append = true
      encoder(PatternLayoutEncoder) {
        pattern = logPattern
      }
    }

    logger('StackTrace', ERROR, ['FULL_STACKTRACE'], false)
  // }
}


//---------- for Grails ----------
appender('GRAILS', FileAppender) { // RollingFileAppender
  file = "${config.log.dir?:targetDir}/grails.log"
  append = true
  encoder(PatternLayoutEncoder) {
    pattern = logPattern
  }
}

['grails.app', 'org.grails'].each {
  logger(it, WARN, ['GRAILS'], false)
}
['org.springframework.security', 'org.springframework.boot.autoconfigure.security'].each {
  logger(it, (config.log.sys.level ?: WARN), ['GRAILS'], false)
}
['org.grails.web.servlet', 'org.grails.spring'].each {
	logger(it, OFF, [], false) // DISABLE
}


//---------- for CCES ----------
appender('CCES', FileAppender) { // RollingFileAppender
  file = "${config.log.dir?:targetDir}/cces.log"
  append = true
  encoder(PatternLayoutEncoder) {
    pattern = logPattern
  }
}

['com.lch', 'grails.app.controllers.AAAInterceptor', 'grails.app.controllers.com.lch', 'grails.app.services.com.lch'].each {
  logger(it, (config.log.cces.level ?: WARN), ['CCES'], false)
}

if (config.log.sql.show) {
  if (config.log.sql.type.show) {
    logger('org.hibernate.type', TRACE, ['CCES'], false)
  }
  logger('org.hibernate.SQL', DEBUG, ['CCES'], false)
}
