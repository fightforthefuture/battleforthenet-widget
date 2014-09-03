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
var animations = {
    banner: {
        options: {
            debug: false,
            url: 'https://www.battleforthenet.com',
            theme: 'dark'
        },
        init: function(options) {
            for (var k in options) this.options[k] = options[k];
            return this;
        },
        start: function() {

            $('a.close').addClass(this.options.theme);
            $('#banner').addClass(this.options.theme);
            $('#banner').show();
            $('#banner').click(this.doClick.bind(this));
            $('a.close').click(function(e) {
                e.preventDefault();
                $('body').addClass('closed');
                trackLeaderboardStat({stat: 'close_widget', data: 'banner'});
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
            });

            setInterval(function() {
                if ($('#text2').css('opacity') == 0)
                {
                    $('#text1').css('opacity', 0);
                    $('#text2').css('opacity', 1);
                }
                else
                {
                    $('#text1').css('opacity', 1);
                    $('#text2').css('opacity', 0);
                }

            }, 6000);
        },
        log: function() {
            if (this.options.debug)
                console.log.apply(console, arguments);
        },

        getUrl: function() {
            return sanitize(this.options.url)+'?from=banner';
        },

        doClick: function(e) {
            e.preventDefault();
            window.open(animations.banner.getUrl());
            trackLeaderboardStat({
                stat: 'click',
                data: animations.banner.getUrl(),
                callback: function() {
                    sendMessage('stop');
                }
            });
        }
    }
}

if (window.location.href.indexOf('LIGHT') != -1) 
    animations.banner.options.theme = 'light';

if (window.location.href.indexOf('EMBED') != -1) 
    animations.banner.start();