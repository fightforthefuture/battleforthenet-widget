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
window.addEventListener('message', function(e) {
	if (!e.data || !e.data.BFTN_WIDGET_MSG)
		return;

	delete e.data.BFTN_WIDGET_MSG;

	switch (e.data.requestType) {
		case 'putAnimation':
			animations[e.data.modalAnimation].init(e.data).start();
			break;
	}
});

var sanitize = function(str)
{
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/javascript\:/gi, 'java script -');
    return str;
}

var sendMessage = function(requestType, data)
{
	data || (data = {});
	data.requestType = requestType;
	data.BFTN_IFRAME_MSG = true;
	parent.postMessage(data, '*');
}

$(document).ready(function() {
	sendMessage('getAnimation');

	// Add close button listener.
	$('#close').on('mousedown', function(e) {
		e.preventDefault();
		sendMessage('stop');
	});
});