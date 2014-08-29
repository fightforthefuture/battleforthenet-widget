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

    if (e.data.HOST_NAME)
    {
        host = e.data.HOST_NAME;
        delete e.data.HOST_NAME;
    }

	switch (e.data.requestType) {
		case 'putAnimation':
            trackLeaderboardStat({
                stat: 'display_widget',
                data: e.data.modalAnimation
            });
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

var trackLeaderboardStat = function(options)
{
    options || (options = {});
    options.stat || (options.stat = 'unknown');
    options.data || (options.data = null);
    options.callback || (options.callback = function() {});

    if (!host)
        return;

    var data = {
        campaign: 'internetslowdown',
        stat: options.stat,
        data: options.data,
        host: host,
        session: session
    };

    $.ajax({
        url: "https://leaderboard.fightforthefuture.org/log",
        // url: "http://debbie:3019/log",    // JL TEST ~ 
        type: "post",
        dataType: "json",
        data: data,
        success: function(res) {
            options.callback(res);
        }
    });
}

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
var guid = function() {
    var _p8 = function(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

$(document).ready(function() {
	sendMessage('getAnimation');

	// Add close button listener.
	$('#close').on('mousedown', function(e) {
		e.preventDefault();
		sendMessage('stop');
	});
});

var host = null;  // this will get populated with the domain of the widget install
var session = guid();