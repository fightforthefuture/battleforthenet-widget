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
    modal: {
        options: {
            debug: false,
        },
        init: function(options) {
            for (var k in options) this.options[k] = options[k];
            return this;
        },
        start: function() {

            $('a.close').click(function(e) {
                e.preventDefault();
                sendMessage('stop');
            });

            $('a.read').click(function(e) {
                e.preventDefault();
                $('#overlay').css('display', 'block');
                setTimeout(function() {
                    $('#overlay').addClass('visible');
                }, 50);
                
            });

            $('a.continue').click(function(e) {
                $('#overlay').removeClass('visible');

                setTimeout(function() {
                    $('#overlay').css('display', 'none');
                }, 1000);
            });
        },
        log: function() {
            if (this.options.debug)
                console.log.apply(console, arguments);
        }
    }
}

setTimeout(function() {
    $('#header h1').html($('h1.headline').html());
    $('#header .cta p').html($('p.cta-hidden-trust-me').html());
}, 2000);
setTimeout(function() {
    $('#header .cta').css('height', $('#header').outerHeight()+'px');
    $('#letter').css('height', $('#modal').outerHeight()+'px');
    $('#letter').css('opacity', 1);
}, 3000);

/**
 *  -------------------------- OMG ---------------------------------------------
 *  The rest of this file is all Internet Explorer's fault.
 *  -------------------------- OMG ---------------------------------------------
 */

setTimeout(function() {
    stupidIEZoomFix();
}, 2250);

function stupidIEZoomFix() {
    if (ieVersion) {
        $('.loading-region').addClass('zoomedOut').addClass('IE');
        $('#modal').addClass('fullyVisible').addClass('IE');
        $('#header').addClass('fullyVisible').addClass('IE');
    } else {
        $('.loading-region').addClass('zoomedOut').addClass('notIE');
        $('#modal').addClass('fullyVisible').addClass('notIE');
        $('#header').addClass('fullyVisible').addClass('notIE');
    }
}

/**
Target IE 10 with JavaScript and CSS property detection.

# 2013 by Tim Pietrusky
# timpietrusky.com
**/

// IE 10 only CSS properties
var ie10Styles = [
    'msTouchAction',
    'msWrapFlow',
    'msWrapMargin',
    'msWrapThrough',
    'msOverflowStyle',
    'msScrollChaining',
    'msScrollLimit',
    'msScrollLimitXMin',
    'msScrollLimitYMin',
    'msScrollLimitXMax',
    'msScrollLimitYMax',
    'msScrollRails',
    'msScrollSnapPointsX',
    'msScrollSnapPointsY',
    'msScrollSnapType',
    'msScrollSnapX',
    'msScrollSnapY',
    'msScrollTranslation',
    'msFlexbox',
    'msFlex',
    'msFlexOrder'
];

var ie11Styles = ['msTextCombineHorizontal']; 

/*
* Test all IE only CSS properties
*/
var b = document.body;
var s = b.style;
var ieVersion = null;
var property;

// Test IE10 properties
for (var i = 0; i < ie10Styles.length; i++) {
    property = ie10Styles[i];

    if (s[property] != undefined) {
        ieVersion = "ie10";
    }
}

// Test IE11 properties
for (var i = 0; i < ie11Styles.length; i++) {
    property = ie11Styles[i];

    if (s[property] != undefined) {
        ieVersion = "ie11";
    }
}

if (ieVersion)
{
    document.getElementById('modal').className = 'IE';
    document.getElementById('header').className = 'IE';
}