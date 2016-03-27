// See http://logback.qos.ch/manual/groovy.html for details on configuration

// import java.nio.charset.Charset

import grails.util.BuildSettings
import grails.util.*

import groovy.util.ConfigSlurper

import org.grails.core.io.DefaultResourceLocator
import org.springframework.boot.logging.logback.*

import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.ConsoleAppender
import ch.qos.logback.core.FileAppender
import ch.qos.logback.core.rolling.RollingFileAppender
// import ch.qos.logback.core.status.OnConsoleStatusListener
import static ch.qos.logback.classic.Level.*



// Environment.executeForCurrentEnvironment {
//   development {
//   }
// }

// statusListener(OnConsoleStatusListener)

// conversionRule 'clr', ColorConverter
// conversionRule 'wex', WhitespaceThrowableProxyConverter

// def ccesPattern = '%clr(%date{yyyy/MM/dd HH:mm:ss.SSS}){faint} ' +
//                   '%clr(%-5level){magenta} ' +
//                   '%clr(%-32logger{24}){cyan} ' + // other format: %-24.32logger
//                   '%clr(-){faint} ' +
//                   '%msg%n%wex'
def ccesPattern = '%date{yyyy/MM/dd HH:mm:ss.SSS} ' +
                  '%-5level ' +
                  '%-32logger{24} ' + // other format: %-24.32logger
                  '- ' +
                  '%msg%n'

def targetDir = BuildSettings.TARGET_DIR
def config = com.lch.aaa.Application.loadConfiguration('logging.groovy')


//---------- console ----------
appender('STDOUT', ConsoleAppender) {
  encoder(PatternLayoutEncoder) {
    // charset = Charset.forName('UTF-8')
    pattern = ccesPattern
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
        pattern = ccesPattern
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
    pattern = ccesPattern
  }
}

['grails.app', 'org.grails', 'org.springframework.security', 'org.springframework.boot.autoconfigure.security'].each {
  logger(it, (config.log.sys.level ?: WARN), ['GRAILS'], false)
}


//---------- for CCES ----------
appender('CCES', FileAppender) { // RollingFileAppender
  file = "${config.log.dir?:targetDir}/cces.log"
  append = true
  encoder(PatternLayoutEncoder) {
    pattern = ccesPattern
  }
}

['com.lch', 'grails.app.controllers.com.lch', 'grails.app.services.com.lch'].each {
  logger(it, (config.log.cces.level ?: WARN), ['CCES'], false)
}

if (config.log.sql.show) {
  if (config.log.sql.type.show) {
    logger('org.hibernate.type', TRACE, ['CCES'], false)
  }
  logger('org.hibernate.SQL', DEBUG, ['CCES'], false)
}
