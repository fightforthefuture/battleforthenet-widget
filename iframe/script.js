(function() {
  function getOrganiztion(org) {
    switch(org) {
      case 'dp':
        return {
          code: 'dp',
          name: 'Demand Progress',
          url: 'https://demandprogress.org/'
        };
      case 'fp':
        return {
          code: 'fp',
          name: 'Free Press',
          url: 'https://www.freepress.net/'
        };
      case 'fftf':
      default:
        return {
          code: 'fftf',
          name: 'Fight for the Future',
          url: 'https://www.fightforthefuture.org/'
        };
    }
  }

  function getTheme(options) {
    var theme = options.theme;

    switch(theme) {
      case 'money':
        return {
          className: theme,
          logos: ['images/money.png'],
          headline: 'Please upgrade your plan to proceed.',
          body: 'Just kidding. You can still get to this site *for now*. But if the FCC ends net neutrality, your cable company could charge you extra fees just to use the websites and apps you want. We can stop them and keep the Internet open, fast, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
      case 'stop':
        return {
          className: theme,
          logos: ['images/stop.png'],
          headline: 'This site has been blocked by your ISP.',
          body: 'Well, not yet. But without net neutrality, cable companies could censor websites, favoring their own business partners. We can stop them and keep the Internet open, fast, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
      case 'slow':
        return {
          className: theme,
          logos: ['images/slow.png'],
          headline: 'Sorry, we\'re stuck in the slow lane.',
          body: 'Well, not yet. Cable companies want to get rid of net neutrality, so they can slow sites like ours to a crawl and shake us down for extra fees just to reach you. If they get their way, the Internet will never be the same. We can stop them and keep the web fast, open, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
      default:
        return {
          className: 'without',
          logos: ['images/slow.png', 'images/stop_gradient.png', 'images/money_gradient.png'],
          headline: 'This is the web without net neutrality.',
          body: 'Cable companies want to get rid of net neutrality. Without it, sites like ours could be censored, slowed down, or forced to charge extra fees. We can stop them and keep the Internet open, fast, and awesome if we all contact Congress and the FCC, but we only have a few days left.'
        };
    }
  }

  function setContent(content) {
    document.body.classList.add(content.className);

    // Render logos
    var fragment = document.createDocumentFragment();
    var img;

    for (var i = 0; i < content.logos.length; i++) {
      img = document.createElement('img');
      img.setAttribute('src', content.logos[i]);
      fragment.appendChild(img);
    }

    document.getElementById('logos').appendChild(fragment);

    // Render headline and body copy
    document.getElementById('headline').textContent = content.headline;
    document.getElementById('content').innerText = content.body;
  }

  function sendMessage(requestType, data) {
    data || (data = {});
    data.requestType = requestType;
    data.BFTN_IFRAME_MSG = true;
    parent.postMessage(data, '*');
  }

  var animations = {
    main: {
      options: {
        debug: false,
      },
      init: function(options) {
        for (var k in options) this.options[k] = options[k];
        setContent(getTheme(this.options));
        this.log('BFTN ANIMATION STARTING');
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
  }

  var transitionTimer;

  function onSuccess(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    if (e && e.code >= 400) return onError(e);

    var loading = document.getElementById('loading');
    loading.addEventListener('transitionend', showAfterAction);
    loading.classList.add('invisible');

    transitionTimer = setTimeout(showAfterAction, 500);
  }

  function showAfterAction(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    document.getElementById('prompt').classList.remove('invisible');
    document.getElementById('main').classList.add('invisible', 'hidden');
    document.getElementById('loading').classList.add('hidden');
  }

  // Handle form submission
  var form = document.getElementById('form')
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Prefill after-action call form
    var phone = document.getElementById('phone').value
    if (phone) document.getElementById('userPhone').value = phone;

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    var loading = document.getElementById('loading');
    loading.addEventListener('transitionend', onSuccess);
    loading.classList.remove('hidden', 'invisible');
    document.getElementById('footer').classList.remove('hidden', 'invisible');

    transitionTimer = setTimeout(onSuccess, 500);

    document.getElementById('prompt').classList.remove('hidden');
    document.getElementById('main').classList.add('hidden');

    /*
    xhr.addEventListener('error', onError);
    xhr.addEventListener('complete', onSuccess);

    xhr.open(form.getAttribute('method'), form.getAttribute('action'), true);
    xhr.send(formData);
    */
  });

  function showCallScript(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    document.getElementById('script').classList.remove('hidden', 'invisible');
    document.getElementById('prompt').classList.add('invisible', 'hidden');
    document.getElementById('loading').classList.add('hidden');
  }

  function onCall(e) {
    if (transitionTimer) clearTimeout(transitionTimer);

    var loading = document.getElementById('loading');
    loading.addEventListener('transitionend', showCallScript);
    loading.classList.add('invisible');

    transitionTimer = setTimeout(showCallScript, 500);
  }

  var call = document.getElementById('call')
  call.addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(call);
    var xhr = new XMLHttpRequest();

    var loading = document.getElementById('loading');
    loading.addEventListener('transitionend', onCall);
    transitionTimer = setTimeout(onCall, 500);
    loading.classList.remove('hidden', 'invisible');

    document.getElementById('prompt').classList.add('invisible');

    xhr.open(call.getAttribute('method'), call.getAttribute('action'), true);
    xhr.send(formData);
  });

  // Add close button listener.
  document.getElementById('close').addEventListener('mousedown', function(e) {
    e.preventDefault();
    sendMessage('stop');
  });

  document.getElementById('background').addEventListener('mousedown', function(e) {
    // Ignore events that propagate up
    if (e.target == document.getElementById('background')) sendMessage('stop');
  });

  // Start animation
  sendMessage('getAnimation');
})();
