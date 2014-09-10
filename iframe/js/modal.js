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
            skipEmailSignup: false,
            skipCallTool: false,
            fastAnimation: false,
            boxUnchecked: false,
            org: null
        },

        // If international, phone call functionality is disallowed
        phoneCallAllowed: true,
        zipcode: null,
        default_org: 'fftf',

        init: function(options) {
            for (var k in options) this.options[k] = options[k];
            return this;
        },
        start: function() {

            if (this.options.skipEmailSignup)
            {
                $('#direct_call').show();
                $('#petition').hide();
                $('.bottom-link').hide();
                $('.bottom-link').hide();
                $('#last-donation-ask').hide();
            }
            if (this.options.skipCallTool)
                this.phoneCallAllowed = false;

            if (this.options.boxUnchecked)
            {
                $('#opt-in').attr('checked', false);
                $('.disclosure').removeClass('nice-check');
            }

            // ------------------------------ Optimizely test vvv
            if (this.options.fastAnimation || (!document.skipOptimizely && document.fastForwardAnimation))
            {
                $('body').addClass('fast-animation');
                setTimeout(stupidIEZoomFix, 10);
            }
            else
            {
                setTimeout(stupidIEZoomFix, 2250);
            }

            // Optimizely test vvv
            if (!document.skipOptimizely && document.showCTATextImmediately)
            {
                $('#header h1').css('opacity', 0);
                $('#header .cta').css('opacity', 1);
            }

            // Optimizely test vvv
            this.optimizelyTextAB();

            // If no org is set, then 16% chance of free press
            if (!this.options.org && Math.random() < 0.16) {
                this.options.org = 'fp';
            }

            if (this.options.org == 'fp')
            {
                $('#fftf_disclosure').hide();
                $('#fp_disclosure').show();
            }
            else if (this.options.org == 'dp')
            {
                $('#fftf_disclosure').hide();
                $('#dp_disclosure').show();
            }
            else if (this.options.org == 'fftf_org')
            {
                $('#fftf_disclosure').hide();
                $('#fftf_org_disclosure').show();
            }

            $('a.close').click(function(e) {
                e.preventDefault();
                $('body').addClass('closed');
                trackLeaderboardStat({stat: 'close_widget', data: 'modal'});
                setTimeout(function() {
                    sendMessage('stop');
                }, 750);
            });

            $('a.letter').click(function(e) {
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
                }, 750);
            });

            $('a#cantcall').click(function(e) {
                e.preventDefault();
                this.showFinal()
            }.bind(this));

            $("form[name=petition]").submit(function(e) {
                e.preventDefault();
                if (this.postUser($(this))) {
                    
                    $("input:not([type=image],[type=button],[type=submit])").val('');

                    if (this.phoneCallAllowed)
                        this.showPhoneCall();
                    else
                        this.showFinal();
                    
                } else {
                    // alert('Please complete the rest of the form. Thanks!');
                }
            }.bind(this));

            $("form[name=direct_call]").submit(function(e) {
                e.preventDefault();
                var phone = this.validatePhone($('#phone_front').val());

                if (!phone)
                {
                    $('#phone_front').addClass('error');
                }
                else
                {
                    this.placePhonecall(phone);
                    this.showFinalWithCallInstructions();
                }
            }.bind(this));

            $('a.facebook').click(function(e) {
                trackLeaderboardStat({stat: 'share', data: 'facebook'});
            });

            $('a.twitter').click(function(e) {
                trackLeaderboardStat({stat: 'share', data: 'twitter'});
            });

            $('#call').click(function(e) {
                e.preventDefault();

                var phone = this.validatePhone($('#phone').val());

                if (!phone)
                    return $('#phone').addClass('error');

                $('#call').attr('disabled', true);
                $('#phone').attr('disabled', true);

                this.placePhonecall(phone);

                setTimeout(function() {
                    this.showFinalWithCallInstructions();
                }.bind(this), 1000);
            }.bind(this));

            $.ajax({
                url: '//fftf-geocoder.herokuapp.com/',
                dataType: 'json',
                type: 'get',
                success: function(data) {
                    if (data.country && data.country.iso_code)
                    {
                        $('#country').val(data.country.iso_code);
                        if (data.country.iso_code != "US")
                        {
                            this.phoneCallAllowed = false;

                            if (this.options.skipEmailSignup)
                            {
                                // Nothing to do. Close the modal now.
                                sendMessage('stop');
                            }
                        }
                    }
                }.bind(this)
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
                return alert('Please enter your info so we can sign the letter.');

            this.zipcode = $('#zip').val();
            var regex = /^\d{5}$/;
            
            if (!regex.test(this.zipcode))
                this.phoneCallAllowed = false;


            // doc['action_comment'] = $("[name=action_comment]").val();
            doc['action_comment'] = '';  // JL HACK
            doc['country'] = $('#country').val();

            if ($('#opt-in').is(':checked') == false)
                doc['opt_out'] = true;

            if (this.options.org)
                doc['org'] = this.options.org;
            else
                doc['org'] = this.default_org;

            $.ajax({
                url: "https://queue.battleforthenet.com/submit",
                // url: "http://debbie:3019/submit",    // JL TEST ~
                type: "post",
                dataType: "json",
                data: doc,
                success: function(res) {
                    userID = res.userID;
                }
            });
            trackLeaderboardStat({stat: 'submit_form'});

            this.trackOptimizely('fcc_post');

            return true;
        },

        trackOptimizely: function(ev) {
            window['optimizely'] = window['optimizely'] || [];
            window.optimizely.push(["trackEvent", ev]);
        },

        showFinalWithCallInstructions: function() {
            $('#stepFinal .defaultText').hide();
            $('#stepFinal .altText').show();
            this.showFinal();
        },

        validatePhone: function(num) {
            num = num.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '');
            num = num.replace("+", "").replace(/\-/g, '');

            if (num.charAt(0) == "1")
                num = num.substr(1);

            if (num.length != 10)
                return false;

            return num;
        },

        placePhonecall: function(num) {
            $('#call').html('Calling...');

            var data = {
                campaignId: 'battleforthenet',
                userPhone: num,
                fftfCampaign: 'internetslowdown',
                fftfReferer: host,
                fftfSession: session
            }
            if (this.zipcode)
                data.zipcode = this.zipcode;

            $.ajax({
                url: 'https://call-congress.fightforthefuture.org/create',
                type: "get",
                dataType: "json",
                data: data,
                success: function(res) {
                    console.log('Placed call-congress call: ', res);
                }
            });

            this.trackOptimizely('call_congress');
        },

        showFinal: function() {
            $('#step1').addClass('hidden');
            $('#header').addClass('hidden');
            $('#stepCall').css('opacity', 0);
            setTimeout(function() {
                $('#step1').css('visibility', 'hidden');
                $('#stepCall').css('visibility', 'hidden');
            }, 1000);
            $('#stepFinal').show();
            setTimeout(function() {
                $('#stepFinal').css('opacity', 1);
            }, 10);
        },

        showPhoneCall: function() {
            $('#step1').addClass('hidden');
            $('#header').addClass('hidden');
            setTimeout(function() {
                $('#step1').css('visibility', 'hidden');
            }, 1000);
            $('#stepCall').show();
            setTimeout(function() {
                $('#stepCall').css('opacity', 1);
            }, 10);
        },

        optimizelyTextAB: function() {

            // JL NOTE ~ disabled
            return false;

            var textVariation = null;

            if (document.textVariation)
                textVariation = document.textVariation

            var showVariation = function(headline, ctaTop, ctaBottom) {
                $('#header h1').html(headline);
                $('#header .cta p em').html(ctaTop);
                $('#header .cta p strong').html(ctaBottom);
            };

            switch (textVariation) {

                case 'variation1':
                    showVariation(
                        '<em>If this site was still loading,</em> would you still be here?',
                        'Big ISPs want the power to slow (and break!) sites like ours.',
                        'Tell lawmakers: &ldquo;Stop discrimination. Defend net neutrality.&rdquo;'
                    );
                    break;

                case 'variation2':
                    showVariation(
                        '<em>If this site was still loading,</em> would you still be here?',
                        'Big ISPs want the power to slow (and break!) sites like ours.',
                        'Don\'t let them destroy the best parts of the Internet. Sign now!'
                    );
                    break;

                case 'variation3':
                    showVariation(
                        '<em>If this site was still loading,</em> would you still be here?',
                        'Comcast wants the power to slow (and break!) any website.',
                        'Only you can stop them. Please, sign this letter.'
                    );
                    break;

                case 'variation4':
                    showVariation(
                        '<em>If this site was still loading,</em> would you still be here?',
                        'Cable giants want the power to slow (and break!) sites like ours.',
                        'Tell lawmakers: &ldquo;Stop discrimination. Defend net neutrality.&rdquo;'
                    );
                    break;

                default:
                    break;
            }
        }
    }
}

$(document).ready(function() {

    $('#header h1').html($('h1.headline').html());
    $('#header .cta p').html($('p.cta-hidden-trust-me').html());

    setTimeout(function() {
        $('#header .cta').css('height', $('#header').outerHeight()+'px');
        $('#letter').css('height', $('#modal').outerHeight()+'px');
        $('#letter').css('opacity', 1);
    }, 1000);

    var loc = window.location.href;

    if (loc.indexOf('EMBED') != -1) {

        document.body.className = 'embedded';
        document.skipOptimizely = true;

        if (loc.indexOf('NOCALL') != -1)
            animations.modal.options.skipCallTool = true; 

        if (loc.indexOf('NOEMAIL') != -1)
            animations.modal.options.skipEmailSignup = true;

        if (loc.indexOf('UNCHECK') != -1)
            animations.modal.options.boxUnchecked = true;

        if (loc.indexOf('DP') != -1)
            animations.modal.options.org = 'dp';

        if (loc.indexOf('FP') != -1)
            animations.modal.options.org = 'fp'; 

        if (loc.indexOf('FFF') != -1)
            animations.modal.options.org = 'fftf_org'; 
               
        animations.modal.options.fastAnimation = true;
        animations.modal.start(); 
    } 
});



/**
 *  -------------------------- OMG ---------------------------------------------
 *  The rest of this file is all Internet Explorer's fault.
 *  -------------------------- OMG ---------------------------------------------
 */



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