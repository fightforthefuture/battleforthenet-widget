/*
 * @licstart  The following is the entire license notice for the
 * JavaScript code in this page.
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
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 */

'use strict';

(function() {
  var transitionTimer;

  var loading = document.getElementById('loading');
  var main = document.getElementById('main');
  var callScript = document.getElementById('script');

  function getOrg(org) {
    function getRandomOrg() {
      var coinToss = Math.random();

      if (coinToss < .20) {
        return 'fp';
      } else if (coinToss < .60) {
        return 'dp';
      } else {
        return 'fftf';
      }
    }

    var orgs = {
      'dp': {
        code: 'dp',
        name: 'Demand Progress',
        url: 'https://demandprogress.org/',
        donate: 'https://secure.actblue.com/donate/nndayofaction?refcode=20170712-bftn'
      },
      'fp': {
        code: 'fp',
        name: 'Free Press Action Fund',
        url: 'https://www.freepress.net/',
        donate: 'https://freepress.actionkit.com/donate/single/'
      },
      'fftf': {
        code: 'fftf',
        name: 'Fight for the Future',
        url: 'https://www.fightforthefuture.org/',
        donate: 'https://donate.fightforthefuture.org/'
      }
    };

    return orgs.hasOwnProperty(org) ? orgs[org] : orgs[getRandomOrg()];
  }

  function getTheme(theme) {
    var themeObj;

    switch(typeof theme === 'string' ? theme : '') {
      case 'money':
        themeObj = {
          className: theme,
          logos: ['images/money.png'],
          headline: 'Please upgrade your plan to proceed.',
          body: 'Well, not yet. But without net neutrality, cable companies could censor websites based on their content, or to favor their own business partners. Congress can stop them, but only if we flood them with calls right now.'
        };
        break;
      case 'stop':
        themeObj = {
          className: theme,
          logos: ['images/stop.png'],
          headline: 'This site has been blocked by your ISP.',
          body: 'Well, not yet. But without net neutrality, cable companies could censor websites, favoring their own business partners. We can stop them and keep the Internet open, fast, and awesome if we all contact the U.S. Congress and the FCC, but we only have a few days left.'
        };
        break;
      case 'slow':
        themeObj = {
          className: theme,
          logos: ['images/slow.png'],
          headline: 'Sorry, we\'re stuck in the slow lane.',
          body: 'Well, not yet. But the FCC is about to vote to get rid of net neutrality, letting ISPs slow sites like this to a crawl and charge everyone extra fees. Congress can stop them, but only if we flood them with calls right now.'
        };
        break;
      case 'without':
        themeObj = {
          className: theme,
          logos: ['images/slow.png', 'images/stop_gradient.png', 'images/money_gradient.png'],
          headline: 'This is the web without net neutrality.',
          body: 'The FCC is about to vote to get rid of net neutrality. Without it, sites like this could be censored, slowed down, or forced to charge extra fees. Congress can stop them, but only if we flood them with calls right now.'
        };
        break;
      case 'countdown':
      default:
        themeObj = {
          className: 'countdown',
          logos: [],
          headline: 'URGENT!',
          body: 'The FCC is about to vote on its plan to kill net neutrality. We have just days to stop censorship, throttling, and extra fees online. Congress needs to hear from Internet users like you right now.'
        };
        break;
    }

    if (typeof theme == 'object') {
      var keys = Object.keys(theme);
      var key;
      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        themeObj[key] = theme[key];
      }
    }

    return themeObj;
  }

  function renderContent(theme) {
    document.body.classList.add(theme.className);

    // Render logos
    var fragment = document.createDocumentFragment();
    var img;

    for (var i = 0; i < theme.logos.length; i++) {
      img = document.createElement('img');
      img.setAttribute('src', theme.logos[i]);
      fragment.appendChild(img);
    }

    document.getElementById('logos').appendChild(fragment);

    // Render headline and body copy
    document.getElementById('headline').textContent = theme.headline;

    var bodyFragment = document.createDocumentFragment();

    var bodyparagraphs = theme.body.split("\n");
    for (var i = 0; i < bodyparagraphs.length; i++) {
      var paragraph = document.createElement('p');
      paragraph.textContent = bodyparagraphs[i];
      bodyFragment.appendChild(paragraph);
    }
    
    var learnMore = document.createElement('a');
    learnMore.setAttribute('href', 'https://www.battleforthenet.com/#widget-learn-more');
    learnMore.setAttribute('target', '_blank');
    learnMore.textContent = 'Learn more.';
    bodyFragment.appendChild(learnMore);

    document.getElementById('content').appendChild(bodyFragment);

    if (theme.className === 'countdown' && typeof Countdown === 'function') {
      new Countdown({
        target: '#countdown',
        date: new Date('November 23, 2017')
      });
    }
  }

  function addCloseListeners() {
    // Add close button listener.
    document.getElementById('close').addEventListener('mousedown', function(e) {
      e.preventDefault();
      sendMessage('stop');
    });

    document.getElementById('background').addEventListener('mousedown', function(e) {
      // Ignore events that propagate up
      if (e.target == document.getElementById('background')) sendMessage('stop');
    });
  }

  function sendMessage(requestType, data) {
    data || (data = {});
    data.requestType = requestType;
    data.BFTN_IFRAME_MSG = true;
    parent.postMessage(data, '*');
  }

  function initGoogleAnalytics() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    if (typeof ga !== 'undefined') {
      ga('create', 'UA-26576645-40', 'auto');
      ga('send', 'pageview');
    }
  }

  var animations = {
    main: {
      options: {
        debug: false,
      },
      init: function(options) {
        for (var k in options) this.options[k] = options[k];

        renderContent(getTheme(this.options.theme));

        var org = getOrg(this.options.org);
        var donateLinks = document.querySelectorAll('a.donate');
        if (donateLinks.length && org.donate) {
          for (var i = 0; i < donateLinks.length; i++) {
            donateLinks[i].setAttribute('href', org.donate);
          }
        }

        if (this.options.uncloseable) {
          document.getElementById('close').classList.add('hidden');
        } else {
          addCloseListeners();
        }

        if (!(this.options.disableGoogleAnalytics || navigator.doNotTrack)) initGoogleAnalytics();

        return this;
      },
      log: function() {
        if (this.options.debug) console.log.apply(console, arguments);
      }
    }
  }

  // Handle iframe messages
  window.addEventListener('message', function(e) {
    if (!e.data || !e.data.BFTN_WIDGET_MSG) return;

    delete e.data.BFTN_WIDGET_MSG;

    switch (e.data.requestType) {
      case 'putAnimation':
        animations[e.data.modalAnimation].init(e.data);
        break;
    }
  });

  function onError(e) {
    // TODO: Error handling
  }

  function showCallScript(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    if (callScript) callScript.classList.remove('invisible');
    if (main) main.classList.add('invisible');
    if (loading) loading.classList.add('hidden');
  }

  function onCall(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    // TODO: Error handling
    // if (e && e.code >= 400) return onError(e);

    if (loading) {
      loading.addEventListener('transitionend', showCallScript);
      loading.classList.add('invisible');
    }

    transitionTimer = setTimeout(showCallScript, 500);
  }

  var call = document.getElementById('call');
  call.addEventListener('submit', function submitCall(e) {
    e.preventDefault();

    var footer = document.getElementById('footer');
    if (footer) {
      footer.classList.remove('hidden');
      footer.classList.remove('invisible');
    }

    if (callScript) callScript.classList.remove('hidden');
    if (main) main.classList.add('hidden');

    var formData = new FormData(call);
    var xhr = new XMLHttpRequest();

    if (loading) {
      loading.addEventListener('transitionend', onCall);
      loading.classList.remove('hidden');
      loading.classList.remove('invisible');
    }

    transitionTimer = setTimeout(onCall, 500);

    xhr.open(call.getAttribute('method'), call.getAttribute('action'), true);
    xhr.send(formData);
  });

  // Start animation
  sendMessage('getAnimation');
})();
