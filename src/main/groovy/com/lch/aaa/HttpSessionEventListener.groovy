package com.lch.aaa

import javax.servlet.http.HttpSession
import org.springframework.context.ApplicationEvent
import org.springframework.context.ApplicationListener
import org.springframework.security.web.session.HttpSessionCreatedEvent
import org.springframework.security.web.session.HttpSessionDestroyedEvent
import org.springframework.security.web.session.HttpSessionEventPublisher
import org.slf4j.Logger
import org.slf4j.LoggerFactory

public class HttpSessionEventListener extends HttpSessionEventPublisher
      implements ApplicationListener<ApplicationEvent> {
     
    private static final Logger LOG = LoggerFactory.getLogger(HttpSessionEventListener.class)
 
    @Override
    public void onApplicationEvent(ApplicationEvent applicationEvent) {
//println '\napp event ==> ' + applicationEvent
super.onApplicationEvent(applicationEvent)

        // if (applicationEvent instanceof HttpSessionDestroyedEvent){
        //     LOG.error "detect ==> ${cte.message}"
        // }
        // if(applicationEvent instanceof HttpSessionCreatedEvent){ //If event is a session created event
 
        //    HttpSession httpSession = httpSessionDestroyedEvent.getSession() //get session object
        //    String sessionId = httpSession.getId() //get session id
        //    ....
        //    persistSessionData(sessionId) //save session data to DB
        //    LOG.debug(" Session is invalidated |SESSION_ID :" + sessionId ) //log data
         
        // }else if(applicationEvent instanceof HttpSessionDestroyedEvent){ //If event is a session destroy event
        //    ...
        // }else{
        //    ...
        // }
    }
}