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
                $('body').addClass('closed');
                trackLeaderboardStat({stat: 'close_widget', data: 'modal'});
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
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

            $("form[name=petition]").submit(function(e) {
                e.preventDefault();
                if (this.postUser($(this))) {
                    
                    $("input:not([type=image],[type=button],[type=submit])").val('');
                    this.showFinal();
                    
                } else {
                    // alert('Please complete the rest of the form. Thanks!');
                }
            }.bind(this));

            $('a.facebook').click(function(e) {
                trackLeaderboardStat({stat: 'share', data: 'facebook'});
            });

            $('a.twitter').click(function(e) {
                trackLeaderboardStat({stat: 'share', data: 'twitter'});
            });
        },
        log: function() {
            if (this.options.debug)
                console.log.apply(console, arguments);
        },

        postUser: function() {
            var formFields = [
                // "action_comment",
                "address1",
                "email",
                "name",
                "zip"
            ];
            var doc = {};

            var fail = false;

            var actionForm = $("form[name=petition]");

            formFields.forEach(function(field) {
                $("input[name=" + field + "]", actionForm).removeClass('error');
                if (
                    $("input[name=" + field + "]", actionForm)[0]
                    &&
                    $("input[name=" + field + "]", actionForm).val() === ""
                ) {
                    fail = true;
                    $("input[name=" + field + "]", actionForm).addClass('error');
                } else {
                    doc[field] = $("input[name=" + field + "]", actionForm).val();
                }
            });

            if (fail)
                return false;

            // doc['action_comment'] = $("[name=action_comment]").val();
            doc['action_comment'] = $("JL-TBD").val();  // JL HACK
            doc['country'] = 'US';                      // JL HACK

            
            $.ajax({
                url: "https://api.battleforthenet.com/submit",
                // url: "http://debbie:3019/submit",    // JL TEST ~
                type: "post",
                dataType: "json",
                data: doc,
                success: function(res) {
                    userID = res.userID;
                }
            });
            trackLeaderboardStat({stat: 'submit_form'});

            return true;
        },

        showFinal: function() {
            $('#step1').addClass('hidden');
            $('#header').addClass('hidden');
            setTimeout(function() {
                $('#step1').css('visibility', 'hidden')
            }, 1000);
            $('#stepFinal').show();
            setTimeout(function() {
                $('#stepFinal').css('opacity', 1)
            }, 10);
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

if (window.location.href.indexOf('EMBED') != -1) 
{
    document.body.className = 'embedded';
    animations.modal.start(); 
}

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
        setTimeout(function() {
            $('#header').addClass('fullyVisible').addClass('IE');
        }, 150);    
    } else {
        $('.loading-region').addClass('zoomedOut').addClass('notIE');
        $('#modal').addClass('fullyVisible').addClass('notIE');
        setTimeout(function() {
            $('#header').addClass('fullyVisible').addClass('notIE');
        }, 150);
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