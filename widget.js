/*
 @licstart  The following is the entire license notice for the
    JavaScript code in this page.

 Copyright (C) 2014 Center for Rights in Action
 Copyright (C) 2014 Jeff Lyon

 The JavaScript code in this page is free software: you can
 redistribute it and/or modify it under the terms of the GNU
 General Public License (GNU GPL) as published by the Free Software
 Foundation, either version 3 of the License, or (at your option)
 any later version. The code is distributed WITHOUT ANY WARRANTY;
 without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.

 As additional permission under GNU GPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 @licend  The above is the entire license notice
    for the JavaScript code in this page.
*/

(function(){ // :)

// Default URL for animation iframe. This gets overlay'ed over your page.
var dfurl = 'https://widget.battleforthenet.com/iframe';


/**
--------------------------------------------------------------------------------
CONFIGURATION OPTIONS
--------------------------------------------------------------------------------
These are default configuration values for the widget. You can override any of
these by pre-defining an object named _bftn_options and setting the appropriate
properties as desired.
--------------------------------------------------------------------------------
*/

// The _bftn_options object is created if it isn't already defined by you
if (typeof _bftn_options == "undefined")
	_bftn_options = {};

// The path to the iframe that gets injected over your page
if (typeof _bftn_options.iframe_base_path == "undefined")
	_bftn_options.iframe_base_path = dfurl;

// Which design to show, either "modal" or "banner" (see _bftn_animations below)
if (typeof _bftn_options.animation == "undefined")
	_bftn_options.animation = 'modal';

// How long to delay before showing the widget
if (typeof _bftn_options.delay == "undefined")
	_bftn_options.delay = 0;

// If set to true, we will log stuff to the console
if (typeof _bftn_options.debug == "undefined")
	_bftn_options.debug = false;

// Usually a cookie is used to only show the widget once. You can override here.
if (typeof _bftn_options.always_show_widget == "undefined")
	_bftn_options.always_show_widget = false;

/**
--------------------------------------------------------------------------------
ANIMATION DEFINITIONS
--------------------------------------------------------------------------------
Here's where the functionality and defaults for each of the animations (either
"modal" or "banner" to begin with). Each animation has its own options property,
which is an object containing default behaviors for that animation. These can be
overridden by passing the appropriately-named properties into the _bftn_options
object (above). This will get merged over the defaults when init is called.
--------------------------------------------------------------------------------
*/
var _bftn_animations = {

	// MODAL ANIMATION
	modal: {

		// Default options: Override these with _bftn_options object (see above)
		options: {
			modalAnimation: 'modal',
			skipEmailSignup: false,
			skipCallTool: false,
			fastAnimation: false,
			boxUnchecked: false,
			org: null
		},

		// init copies the _bftn_options properties over the default options
		init: function(options) {
			for (var k in options) this.options[k] = options[k];
			return this;
		},

		// what to do when the animation starts
		start: function() {
			var css = '#_bftn_iframe { position: fixed; left: 0px; top: 0px; \
				width: 100%; height: 100%; z-index: 100001; }'

			_bftn_util.injectCSS('_bftn_iframe_css', css);

			var iframe = _bftn_util.createIframe(this.options.modalAnimation);
			_bftn_util.bindIframeCommunicator(iframe, this);
		},

		// what to do when the animation stops
		stop: function() {
			_bftn_util.destroyIframe();
		}
	},

	// BANNER ANIMATION
	banner: {

		// Default options: Override these with _bftn_options object (see above)
		options: {
			modalAnimation: 'banner',
			position: 'topright', // topright|bottomright
			width: 430,
			height: 104,
			offsetY: 20,
			url: 'https://www.battleforthenet.com',
			theme: 'light'
		},

		// init copies the _bftn_options properties over the default options
		init: function(options) {
			for (var k in options) this.options[k] = options[k];
			return this;
		},

		// what to do when the animation starts
		start: function() {

			console.log('width: ', this.options.width);

			switch (this.options.position) {

				case 'bottomright':
					var pos = 'bottom: '+this.options.offsetY+'px; right: 0px;';
					var stripPos = 'bottom';
					break;

				default:
					var pos = 'top: '+this.options.offsetY+'px; right: 0px;'
					var stripPos = 'top';
					break;
			}

			// The window must be a certain width to show the floating banner
			// otherwise it will be fixed to the top / bottom
			var minFloatWidth = this.options.width-1;

			var css = '#_bftn_iframe { \
					position: fixed; '+pos+' \
					width: '+this.options.width+'px; \
					height: '+this.options.height+'px; \
					z-index: 100001; \
				} \
				@media (max-width:'+minFloatWidth+'px) { \
					#_bftn_iframe { \
						position: absolute; \
						width: 100%; \
						left: 0px; \
						'+stripPos+': 0px; \
					} \
				}';

			_bftn_util.injectCSS('_bftn_iframe_css', css);

			var iframe = _bftn_util.createIframe(this.options.modalAnimation);
			_bftn_util.bindIframeCommunicator(iframe, this);
		},

		// what to do when the animation stops
		stop: function() {
			_bftn_util.destroyIframe();
		}
	}
}

/**
--------------------------------------------------------------------------------
UTILITY FUNCTIONS
--------------------------------------------------------------------------------
*/
var _bftn_util = {

	// Inject CSS styles into the page
	injectCSS: function(id, css)
	{
		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = id;
		if (style.styleSheet) style.styleSheet.cssText = css;
		else style.appendChild(document.createTextNode(css));
		document.head.appendChild(style);
	},

	// Create the iframe used to display the animation  
	createIframe: function(animation) {
		var iframe = document.createElement('iframe');
		iframe.id = '_bftn_iframe';
		iframe.src = _bftn_options.iframe_base_path + '/' + animation + '.html';
		iframe.frameBorder = 0;
		iframe.allowTransparency = true; 
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		return iframe;
	},

	// Destroy the iframe used to display the animation
	destroyIframe: function() {
		var iframe = document.getElementById('_bftn_iframe');
		iframe.parentNode.removeChild(iframe);
	},

	// Sends / receives event messages to the iframe (IE9+)
	// Necessary because the iframe lives on a different domain and we can't
	// just call Javascript functions to/from it due to XSS protections.
	bindIframeCommunicator: function(iframe, animation) {
		var sendMessage = function(requestType, data)
		{
			data || (data = {});
			data.requestType = requestType;
			data.BFTN_WIDGET_MSG = true;
			data.HOST_NAME = hostname;
			iframe.contentWindow.postMessage(data, '*');
		}

		var method = window.addEventListener ? "addEventListener":"attachEvent";
		var eventer = window[method];
		var messageEvent = method == "attachEvent" ? "onmessage":"message";

		var hostname = this.getHostname();

		eventer(messageEvent,function(e) {
			if (!e.data || !e.data.BFTN_IFRAME_MSG)
				return;

			delete e.data.BFTN_IFRAME_MSG;

			switch (e.data.requestType) {
				case 'getAnimation':
					iframe.style.display = 'block';
					sendMessage('putAnimation', animation.options);
					break;
				case 'stop':
					animation.stop();
					break;
			}
		}, false);

	},

	// Set a cookie. Used to only show the widget once (unless you override).
	setCookie: function(name,val,exdays)
	{
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = name + "=" + val + "; " + expires;
	},

	// Get the cookie. Used to only show the widget once.
	getCookie: function(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
  		{
  			var c = ca[i].trim();
  			if (c.indexOf(name)==0)
  				return c.substring(name.length,c.length);
  		}
		return "";
	},

	// Get the hostname of the web page. Used to track stats for leaderboards
	getHostname: function() {
		var hostname = window.location.host.replace('www.', '');
		return hostname;
	},

	// If _bftn_options.debug is on, then console.log some stuff
	log: function() {
		if (_bftn_options.debug)
			console.log.apply(console, arguments);
	}
}

/**
--------------------------------------------------------------------------------
MAIN FUNCTIONALITY (called once the page is ready)
--------------------------------------------------------------------------------
*/
var ready = function() {

	// Should we show the widget, regardless?
	var url_override = window.location.href.indexOf('SHOW_BFTN_WIDGET') > -1;
	if (!_bftn_options.always_show_widget && url_override == false) {
		// Only show once.
		if (_bftn_util.getCookie('_BFTN_WIDGET_SHOWN')) {
			return;
		}

		// Only show on September 10th 2014.
		// JL HACK ~ remove before the end of September >_>
		if (new Date().getDate() < 10) {
			return;
		}
	}

	_bftn_util.setCookie('_BFTN_WIDGET_SHOWN', 'true', 365);

	// JL HACK ~ Force iPhone / iPod to show banner while we fix issues
	if(/(iPhone|iPod)/g.test(navigator.userAgent))
		_bftn_options.animation = 'banner';

	if (typeof _bftn_animations[_bftn_options.animation] == "undefined")
		return _bftn_util.log('Animation undefined: '+_bftn_options.animation);

	var animation = _bftn_animations[_bftn_options.animation];

	var images = new Array()
	var preloaded = 0;

	setTimeout(function() {
		animation.init(_bftn_options).start();
	}, _bftn_options.delay);
}

// Wait for DOM content to load.
var curState = document.readyState;
if (curState=="complete" || curState=="loaded" || curState=="interactive") {
	ready();
} else if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded', ready, false);
}


})(); // :)
