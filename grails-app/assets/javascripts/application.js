//= require jquery-2.2.0.min
//  require_tree .
//= require_self
//= require bootstrap
//= require plugins
//= require datetime
//= require AdminLTE

"use strict";

if (typeof jQuery !== 'undefined') {
  jQuery.support.cors = true;

  jQuery.extend({
    convertParamsFromQueryStr: function(str) {
      if (typeof str == 'undefined' || str == null) {
        return {};
      }
      // method 1:
      // var queryStr = decodeURI((str || document.location.search).replace(/(^.*\?)/,''));
      // return queryStr.split("&").map(function(n) {
      //     return n = n.split("="), this[n[0]] = n[1], this
      //   }.bind({}))[0];

      // method 2:
      var queryStr = decodeURI((str || document.location.search).replace(/(^.*\?)/,'').replace(/&/g, "\",\"").replace(/\=/g, "\":\""));
      return JSON.parse('{"' + queryStr + '"}')
    }
  });

  $.ajaxSetup({
    converters: {
      "text json": function(json) {
        return $.parseJSON((typeof(json) == 'string') ?
          json.replace(/new Date\((\d*)\)/g, "$1") :
          json
        );
      }
    }
  });

  /*----- first of all -----*/
  (function($) {

    $('.treeview-menu a').click(function() {
      if (! /\&sc=/.test(this.href)) {
        if ($('body').hasClass('sidebar-collapse')) {
          this.href += '&sc=true';
        }
      }
    });

  })(jQuery);
}

/*---------------
  message prompt
 ----------------*/
function log(m) {
  console.log.apply(console, [m]);
}

function alertInformation(data, jqXHR) { // jqXHR might be undefined
  BootstrapDialog.show({
    type: BootstrapDialog.TYPE_SUCCESS,
    // draggable: true,
    title: 'Info',

    message: function(dialog) {
      setTimeout(function() {
        dialog.close();
      }, 2500);

      return data.message;
    }
  });
}

function joinMessageToDialog (msgObj) {
  var msgLi = msgObj.map ? 
    msgObj.map(function(obj) {
      var item = $('<li/>');

      if (typeof obj == 'object') {
        if (typeof obj['message'] !== 'undefined') {
          item.attr('data-field-id', obj['field']).html(obj['message']);

        } else {
          var key = Object.keys(obj)[0];
          item.attr('data-field-id', key).html(obj[key]);
        }

      } else {
        item.html(obj);
      }

      return item;

    }) : function() {
      console.log(msgObj.stack);
      return $('<li/>').html(msgObj.toString());
    };

  return $('<ul/>').append(msgLi).html();
}

function organizeAlertMessage(data, propName, jqXHR, replyCode, callbackFn) {
  return function(dialog) {
    if (callbackFn) {
      callbackFn.call(this, dialog);
    }

    if (typeof jqXHR !== 'undefined' && jqXHR.status >= replyCode) {
      dialog.setTitle(dialog.getTitle() + ' - ' + jqXHR.status);
    }
    if (typeof data[propName] !== 'undefined' && data[propName] !== '') {
      if (typeof data[propName] == 'string') {
        return joinMessageToDialog(data[propName].split(';'));

      } else if (data[propName].filter) {
        return joinMessageToDialog(data[propName].filter(function(v) { return v!=='' }));

      } else {
        return joinMessageToDialog(data[propName]);
      }

    } else {
      return jqXHR.statusText;
    }      
  }
}

function alertWarning(data, jqXHR) {
  BootstrapDialog.show({
    type: BootstrapDialog.TYPE_WARNING,
    // draggable: true,
    title: 'Warning',
    message: organizeAlertMessage(data, 'warning', jqXHR, 400,
      function(dialog) {
        setTimeout(function() {
          dialog.close();
        }, 4000);
      }
    )
  });
}

function alertError(data, jqXHR) {
  BootstrapDialog.show({
    type: BootstrapDialog.TYPE_DANGER,
    // draggable: true,
    // closable: false,
    title: 'Error',
    message: organizeAlertMessage(data, 'errors', jqXHR, 500)
  });
}

function alertMessage(data, jqXHR) {
  if (typeof data['errors'] !== 'undefined' && data.errors !== '' ||
    typeof jqXHR !== 'undefined' && jqXHR.status >= 500) {
    alertError(data, jqXHR);

  } else if (typeof data['warning'] !== 'undefined' && data.warning !== '' ||
    typeof jqXHR !== 'undefined' && jqXHR.status >= 400) {
    alertWarning(data, jqXHR);

  } else if (typeof data['message'] !== 'undefined' && data.message !== '') {
    alertInformation(data, jqXHR);
    return true;

  } else {
    return true;
  }
}

function transformServerResult(callbackFn) {
  return function(response, status, jqXHR) {
    // JSON response, 'success' status, 200 of jqXHR.status, 'OK' of jqXHR.statusText
    var isNormal = alertMessage(response, jqXHR);

    if (isNormal && callbackFn) {
      callbackFn.call(this, response);
    }
  }
}

function transformServerError(callbackFn) {
  return function(jqXHR, status, message) {
    // reply-code of jqXHR.status, major message or reply-message of jqXHR.statusText
    alertMessage(
      jqXHR.status < 500 && { // jqXHR.status == 0 && {
        warning: ( jqXHR.responseJSON && jqXHR.responseJSON.warning || jqXHR.responseText || message )
      } || {
        errors: ( jqXHR.responseJSON && jqXHR.responseJSON.errors || jqXHR.responseText || message )
      },
      jqXHR);

    if (callbackFn) {
      callbackFn.call(this, message);
    }
  }
}

/*---------------
  base64 encoder
 ----------------*/
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(c){var a="";var k,h,f,j,g,e,d;var b=0;c=Base64._utf8_encode(c);while(b<c.length){k=c.charCodeAt(b++);h=c.charCodeAt(b++);f=c.charCodeAt(b++);j=k>>2;g=((k&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64}else{if(isNaN(f)){d=64}}a=a+this._keyStr.charAt(j)+this._keyStr.charAt(g)+this._keyStr.charAt(e)+this._keyStr.charAt(d)}return a},decode:function(c){var a="";var k,h,f;var j,g,e,d;var b=0;c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<c.length){j=this._keyStr.indexOf(c.charAt(b++));g=this._keyStr.indexOf(c.charAt(b++));e=this._keyStr.indexOf(c.charAt(b++));d=this._keyStr.indexOf(c.charAt(b++));k=(j<<2)|(g>>4);h=((g&15)<<4)|(e>>2);f=((e&3)<<6)|d;a=a+String.fromCharCode(k);if(e!=64){a=a+String.fromCharCode(h)}if(d!=64){a=a+String.fromCharCode(f)}}a=Base64._utf8_decode(a);return a},_utf8_encode:function(b){b=b.replace(/\r\n/g,"\n");var a="";for(var e=0;e<b.length;e++){var d=b.charCodeAt(e);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}return a},_utf8_decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+1);c3=a.charCodeAt(d+2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}return b}};

/*------------
  ajax chain
 ------------*/
var Chainable = function Chainable() {
  return {
    chain : function(next) {
      var newDef = $.Deferred();

      this.done( function(delivery) {
        next(delivery||null).done(newDef.resolve);
      });

      return newDef.promise(Chainable());
    }
  };
}

function chainPassCall(delivery) {
  var dfd = new jQuery.Deferred();
  dfd.resolve({rc: delivery.rc, data: delivery.data});
  return dfd.promise(Chainable());
}

function chainAjaxCall(ajaxParams) {
  var dfd = new jQuery.Deferred();

  $.ajax(ajaxParams).then(
      function (resp, status, jqXHR) {
        dfd.resolve({rc: 0, data: resp});
      },
      transformServerError(function (msg) {
        // TODO: point what happened with the URL
        dfd.resolve({rc: 1, data: msg});
      })
    );

  return dfd.promise(Chainable());
}

/*-----------------
  action in dialog
 ------------------*/
function requestAction4BootstrapDialog(action, dataKey, params) {

  return function(dialog) {
    var closeFn = 'cb' + dialog.getId().split('-')[0];
    // 1: BootstrapDialog.dialogs[' + dialog.getId() + '].close
    // 2: action.callback.name
    window[closeFn] = function(content) {
      dialog.close();
      if (typeof action.callback !== 'undefined') {
        action.callback.call(null, content);
      }
    };

    var theUrl = action.url.split('?');
    var actionUrl = theUrl[0] + ((typeof dataKey !== 'undefined' /*&& (dataKey.length > 0 || dataKey > 0)*/) ? ('/' + dataKey) : '');
    var actionParams = $.convertParamsFromQueryStr(theUrl.length > 1 ? theUrl[1] : null);
    $.extend(actionParams, {cb: Base64.encode(closeFn)}, params);

    return $('<div><span class="ajax-loader">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>')
      // .delay(100)
      .load(actionUrl, actionParams, function(response, status, jqXHR) {
        if (jqXHR.status >= 400) {
          dialog.setType(BootstrapDialog.TYPE_DANGER);
          dialog.setTitle(dialog.getTitle() + ' (code: ' + jqXHR.status + ')');
          dialog.getModalBody().html(response ? response : jqXHR.statusText);

        } else {
          dialog.setType(BootstrapDialog.TYPE_PRIMARY);
        }
      });
  }
}

/*--------
  renders
 ---------*/
function renderCheckBox4GrailsFieldContain(contain) {
  var chkBox = contain.find('input[type="checkbox"]');
  var I = contain.find('i');
  var strI = renderCheckBox(chkBox.val() && /on|true/i.test(chkBox.prop('checked')));

  if (I.length) {
    I.replaceWith(strI);

  } else {
    contain.find('label').before(strI);
  }
}

function renderCheckBox(data) {
  return (data == true || data == 'true') ? '<i class="fa fa-check-square-o"></i>' :
        (data == false || data == 'false') ? '<i class="fa fa-square-o"></i>' : data;
}
