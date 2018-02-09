/**
 * @license
 * BSD 2-Clause License
 * 
 * Copyright (c) 2017, Fight for the Future
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
!function(){function t(){function t(){setTimeout(function(){e[_bftn_options.animation].init(_bftn_options).start()},_bftn_options.delay)}new Array;(_bftn_options.always_show_widget||-1!==window.location.href.indexOf("ALWAYS_SHOW_BFTN_WIDGET")||!n.getCookie("_BFTN_WIDGET_VIEW")&&!n.getCookie("_BFTN_WIDGET_ACTION"))&&(n.setCookie("_BFTN_WIDGET_VIEW","true",_bftn_options.viewCookieExpires),n.injectCSS("_bftn_iframe_css","#_bftn_wrapper { position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 20000; -webkit-overflow-scrolling: touch; overflow-y: auto; } #_bftn_iframe { width: 100%; height: 100%;  }"),t())}"undefined"==typeof _bftn_options&&(_bftn_options={}),void 0===_bftn_options.iframe_base_path&&(_bftn_options.iframe_base_path="https://widget.battleforthenet.com/iframe"),void 0===_bftn_options.animation&&(_bftn_options.animation="main"),void 0===_bftn_options.delay&&(_bftn_options.delay=1e3),void 0===_bftn_options.debug&&(_bftn_options.debug=!1),void 0===_bftn_options.date&&(_bftn_options.date=new Date(2017,11,14)),void 0===_bftn_options.viewCookieExpires&&(_bftn_options.viewCookieExpires=1),void 0===_bftn_options.actionCookieExpires&&(_bftn_options.actionCookieExpires=7),void 0===_bftn_options.always_show_widget&&(_bftn_options.always_show_widget=!1),void 0===_bftn_options.theme&&(_bftn_options.theme="countdown");var e={main:{options:{modalAnimation:"main"},init:function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)this.options[e[n]]=t[e[n]];return this},start:function(){n.createIframe();n.bindIframeCommunicator(document.getElementById("_bftn_iframe"),this)},stop:function(){n.destroyIframe()}}},n={injectCSS:function(t,e){var n=document.createElement("style");n.type="text/css",n.id=t,n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e)),document.head.appendChild(n)},createIframe:function(){var t=document.createElement("div");t.id="_bftn_wrapper";var e=document.createElement("iframe");return e.id="_bftn_iframe",e.src=_bftn_options.iframe_base_path+"/iframe.html",e.frameBorder=0,e.allowTransparency=!0,e.style.display="none",t.appendChild(e),document.body.appendChild(t),t},destroyIframe:function(){var t=document.getElementById("_bftn_wrapper");t.parentNode.removeChild(t)},bindIframeCommunicator:function(t,e){function o(e,n){n||(n={}),n.requestType=e,n.BFTN_WIDGET_MSG=!0,t.contentWindow.postMessage(n,"*")}var i=window.addEventListener?"addEventListener":"attachEvent";(0,window[i])("attachEvent"==i?"onmessage":"message",function(i){if(i.data&&i.data.BFTN_IFRAME_MSG)switch(delete i.data.BFTN_IFRAME_MSG,i.data.requestType){case"getAnimation":t.style.display="block",o("putAnimation",e.options);break;case"stop":e.stop();break;case"cookie":n.setCookie(i.data.name,i.data.val,i.data.expires)}},!1)},setCookie:function(t,e,n){var o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);var i="expires="+o.toGMTString();document.cookie=t+"="+e+"; "+i+"; path=/"},getCookie:function(t){for(var e,n=t+"=",o=document.cookie.split(";"),i=0;i<o.length;i++)if(0==(e=o[i].trim()).indexOf(n))return e.substring(n.length,e.length);return""},log:function(){_bftn_options.debug&&console.log.apply(console,arguments)}};switch(document.readyState){case"complete":case"loaded":case"interactive":t();break;default:"function"==typeof document.addEventListener&&document.addEventListener("DOMContentLoaded",t,!1)}}();
//# sourceMappingURL=widget.js.map
