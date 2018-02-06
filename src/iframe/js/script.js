'use strict';

(function() {
  var transitionTimer;

  var loading = document.getElementById('loading');
  var main = document.getElementById('main');
  var callPrompt = document.getElementById('prompt');
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
        donate: 'https://donate.fightforthefuture.org/campaigns/bftnprotests/'
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
          body: 'Well, not yet. But the FCC just voted to gut net neutrality rules, letting Internet providers like Verizon and Comcast control what we can see and do online with new fees, throttling, and censorship. But we can still get Congress to stop this by using the Congressional Review Act (CRA) to overturn the FCC vote.\n\nWe need one more vote to win in the Senate. Write and call now!'
        };
        break;
      case 'stop':
        themeObj = {
          className: theme,
          logos: ['images/stop.png'],
          headline: 'This site has been blocked by your ISP.',
          body: 'Well, not yet. But the FCC just voted to gut net neutrality rules, letting Internet providers like Verizon and Comcast control what we can see and do online with new fees, throttling, and censorship. But we can still get Congress to stop this by using the Congressional Review Act (CRA) to overturn the FCC vote.\n\nWe need one more vote to win in the Senate. Write and call now!'
        };
        break;
      case 'slow':
        themeObj = {
          className: theme,
          logos: ['images/slow.svg'],
          headline: 'Sorry, we\'re stuck in the slow lane.',
          body: 'Well, not yet. But the FCC just voted to gut net neutrality rules, letting Internet providers like Verizon and Comcast control what we can see and do online with new fees, throttling, and censorship. But we can still get Congress to stop this by using the Congressional Review Act (CRA) to overturn the FCC vote.\n\nWe need one more vote to win in the Senate. Write and call now!'
        };
        break;
      case 'without':
        themeObj = {
          className: theme,
          logos: ['images/slow.svg', 'images/stop_gradient.png', 'images/money_gradient.png'],
          headline: 'This is the web without net neutrality.',
          body: 'The FCC just voted to gut net neutrality rules, letting Internet providers like Verizon and Comcast control what we can see and do online with new fees, throttling, and censorship. But we can still get Congress to stop this by using the Congressional Review Act (CRA) to overturn the FCC vote.\n\nWe need one more vote to win in the Senate. Write and call now!'
        };
        break;
      case 'glitch':
        themeObj = {
          className: theme,
          logos: ['images/glitch.png'],
          body: 'The FCC just voted to gut net neutrality rules, letting Internet providers like Verizon and Comcast control what we can see and do online with new fees, throttling, and censorship. But we can still get Congress to stop this by using the Congressional Review Act (CRA) to overturn the FCC vote.\n\nWe need one more vote to win in the Senate. Write and call now!'
        };
        break;
      case 'capitol':
        themeObj = {
          className: 'onemorevote onemorevote-capitol',
          logos: [],
          htmlContent: 'The FCC voted to repeal net neutrality, letting internet providers like Verizon and Comcast impose new fees, throttle bandwidth, and censor online content.  But we can stop them by using the Congressional Review Act (CRA).<br><strong>We need one more vote to win the Senate.  Fill out the form below to join the mission, or <a href="https://www.battleforthenet.com/#widget-learn-more">learn more here</a>.</strong>'
        };
        break;
      case 'onemorevote':
        themeObj = {
          className: 'onemorevote onemorevote-text',
          logos: [],
          htmlContent: 'The FCC voted to repeal net neutrality, letting internet providers like Verizon and Comcast impose new fees, throttle bandwidth, and censor online content.  But we can stop them by using the Congressional Review Act (CRA).<br><strong>We need one more vote to win the Senate.  Fill out the form below to join the mission, or <a href="https://www.battleforthenet.com/#widget-learn-more">learn more here</a>.</strong>'
        };
        break;
      case 'countdown':
      default:
        themeObj = {
          className: 'countdown',
          logos: [],
          headline: 'URGENT!',
          body: 'The FCC just voted to gut net neutrality rules, letting Internet providers like Verizon and Comcast control what we can see and do online with new fees, throttling, and censorship. But we can still get Congress to stop this by using the Congressional Review Act (CRA) to overturn the FCC vote.\n\nWe need one more vote to win in the Senate. Write and call now!'
        };
        break;
    }

    if (typeof theme == 'object') {
      var keys = Object.keys(theme);
      for (var k = 0; k < keys.length; k++) {
        themeObj[keys[k]] = theme[keys[k]];
      }
    }

    return themeObj;
  }

  function renderContent(theme) {
    var classNames = theme.className.split(' ');
    for (var i = 0; i < classNames.length; i++) {
      document.body.classList.add(classNames[i]);
    }

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

    if (theme.htmlContent) {
      document.getElementById('content').innerHTML = theme.htmlContent;
    }
    else {
      var bodyFragment = document.createDocumentFragment();
      var bodyCopy = theme.body.split('\n');
      var paragraph;

      for (var i = 0; i < bodyCopy.length; i++) {
        paragraph = document.createElement('p');
        paragraph.textContent = bodyCopy[i];
        bodyFragment.appendChild(paragraph);
      }
      
      var learnMore = document.createElement('a');
      learnMore.setAttribute('href', 'https://www.battleforthenet.com/#widget-learn-more');
      learnMore.setAttribute('target', '_blank');
      learnMore.textContent = 'Learn more.';

      // Append link to last paragraph in body copy.
      paragraph.textContent += ' ';
      paragraph.appendChild(learnMore);

      document.getElementById('content').appendChild(bodyFragment);
    }

    if (theme.className === 'countdown' && typeof Countdown === 'function') {
      new Countdown({
        target: '#countdown',
        date: this.options.date
      });
    }
    else if (theme.className.indexOf('onemorevote-capitol') !== -1 && typeof ProgressBar === 'function') {
      new ProgressBar({
        target: '#progress-bar'
      });
    }
  }

  function renderOrgRotation(org) {
    var fragment = document.createDocumentFragment();

    var orgInput = document.createElement('input');
    orgInput.setAttribute('type', 'hidden');
    orgInput.setAttribute('name', 'org');
    orgInput.setAttribute('value', org.code);
    fragment.appendChild(orgInput);

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', '_opt_in');
    checkbox.setAttribute('checked', 'checked');
    fragment.appendChild(checkbox);

    var orgLink = document.createElement('a');
    orgLink.setAttribute('href', org.url);
    orgLink.setAttribute('target', '_blank');
    orgLink.textContent = org.name;
    fragment.appendChild(orgLink);

    var disclaimer = document.createElement('span');
    disclaimer.textContent = ' will contact you about future campaigns. FCC comments are public records.';
    fragment.appendChild(disclaimer);

    document.getElementById('rotation').appendChild(fragment);

    var donateLinks = document.querySelectorAll('a.donate');
    if (donateLinks.length) {
      for (var i = 0; i < donateLinks.length; i++) {
        if (org.donate) donateLinks[i].setAttribute('href', org.donate);
      }
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
        var keys = Object.keys(options);
        for (var k = 0; k < keys.length; k++) {
          this.options[keys[k]] = options[keys[k]];
        }

        renderContent.call(this, getTheme(this.options.theme));
        renderOrgRotation(getOrg(this.options.org));

        var org = getOrg(this.options.org);

        if (this.options.uncloseable) {
          document.getElementById('close').classList.add('hidden');
        } else {
          addCloseListeners();
        }

        if (!(this.options.disableGoogleAnalytics || navigator.doNotTrack)) initGoogleAnalytics();

        function onError(e) {
          if (Raven) Raven.captureException(e);
        }

        function showCallScript(e) {
          if (transitionTimer) clearTimeout(transitionTimer);

          if (callScript) callScript.classList.remove('invisible');
          if (main) main.classList.add('invisible');
          if (loading) loading.classList.add('hidden');
        }

        function setActionCookie() {
          sendMessage('cookie', {
            name: '_BFTN_WIDGET_ACTION',
            val: 'true',
            expires: this.options.actionCookieExpires
          });
        }

        // Handle form submission
        var form = document.getElementById('form');
        form.addEventListener('submit', function submitForm(e) {
          e.preventDefault();

          // Prefill after-action call form
          var userPhone = document.getElementById('userPhone');
          var phone = document.getElementById('phone');
          if (userPhone && phone && phone.value) userPhone.value = phone.value;

          var postcode = document.getElementById('postcode');

          var protest = document.getElementById('protest');
          if (protest && postcode.value) {
            protest.setAttribute('href', [protest.href, '?zipcode=', postcode.value].join(''));
          }

          var zipcode = document.getElementById('zipcode');
          if (postcode && postcode.value && zipcode) zipcode.value = postcode.value;

          // var footer = document.getElementById('footer');
          // if (footer) {
          //   footer.classList.remove('hidden');
          //   footer.classList.remove('invisible');
          // }

          if (callPrompt) callPrompt.classList.remove('hidden');
          if (main) main.classList.add('hidden');

          // TODO: Add config option to skip real submit?
          // loading.addEventListener('transitionend', onSuccess.bind(this));
          // transitionTimer = setTimeout(onSuccess.bind(this), 500);

          var source = document.getElementById('source');
          if (source) source.value = document.referrer;

          var formData = new FormData(form);
          var xhr = new XMLHttpRequest();

          // handle opt-out
          var opt_in = document.getElementById('_opt_in');
          if (!opt_in.checked) formData.append('opt_out', 1); 

          // TODO: Error handling
          xhr.addEventListener('error', onSuccess.bind(this));
          xhr.addEventListener('load', onSuccess.bind(this));

          xhr.open(form.getAttribute('method'), form.getAttribute('action'), true);
          xhr.send(formData);

          if (loading) {
            loading.classList.remove('hidden');
            loading.classList.remove('invisible');
          }
        }.bind(this));

        function onSuccess(e) {
            if (transitionTimer) clearTimeout(transitionTimer);

            // TODO: Error handling
            // if (e && e.code >= 400) return onError(e);
            setActionCookie.call(this);

            if (loading) {
              loading.addEventListener('transitionend', showAfterAction);
              loading.classList.add('invisible');
            }

            transitionTimer = setTimeout(showAfterAction, 500);
        }

        function showAfterAction(e) {
            if (transitionTimer) clearTimeout(transitionTimer);

            if (callPrompt) callPrompt.classList.remove('invisible');

            if (main) {
              main.classList.add('invisible');
              main.classList.add('hidden');
            }

            if (loading) loading.classList.add('hidden');
        }

        function onCall(e) {
          if (transitionTimer) clearTimeout(transitionTimer);

          // TODO: Display error instead of capturing silently?
          if (e && e.code >= 300) onError(e);

          setActionCookie.call(this);

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
          if (callPrompt) callPrompt.classList.add('hidden');

          var formData = new FormData(call);
          var xhr = new XMLHttpRequest();

          if (loading) {
            loading.addEventListener('transitionend', onCall.bind(this));
            loading.classList.remove('hidden');
            loading.classList.remove('invisible');
          }

          transitionTimer = setTimeout(onCall.bind(this), 500);

          xhr.open(call.getAttribute('method'), call.getAttribute('action') + '?ref=' + document.referrer, true);
          xhr.send(formData);
        }.bind(this));

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

  // Start animation
  sendMessage('getAnimation');
})();
