# How to install the widget

Add this to any page, and you're golden: ([**See the demo!**](https://widget.battleforthenet.com/demos/modal.html))

```html
<script src="https://widget.battleforthenet.com/widget.js" async></script>
```

Or, follow these [easy instructions for Tumblr](http://tumblr.fightforthefuture.org/post/162878793988/how-to-stand-up-for-netneutrality-on-tumblr).

The goal of this project is to allow anyone with a web site to run their own campaign to save net neutrality. Simply add one line of JavaScript and you're good to go! The modal animation will show up front-and-center on your page, prompting
visitors to contact Congress and the FCC.

**NOTE: By default, the widget will not display until midnight July 12, so you can add the code right now. If you'd like it to work normally on your site before then, just set a different date (the current date) using the method below.**

If you have any problems or questions regarding the widget, please [submit an issue](https://github.com/fightforthefuture/battleforthenet-widget/issues).


# How it works

The widget is designed to appear on July 12, 2017, and only once, per user, per device. If you'd like to force it to show up on your page for testing, please reload the page with `#ALWAYS_SHOW_BFTN_WIDGET` at the end of the URL.

Please take a look at [**widget.js**](https://github.com/fightforthefuture/battleforthenet-widget/blob/master/widget.js) if you want to see exactly what you'll
be embedding on your page.

* Compatible with Firefox, Chrome, Safari and Internet Explorer 11+.
* Embed the widget JavaScript code on your page.
* Optionally pass in customization parameters (see below), or defaults are used.
* Widget checks to make sure it should be shown (July 12th 2017 and hasn't been shown to this user before, via cookie). You can override this check for testing purposes.
* Widget preloads any images required for the chosen animation.
* Widget injects a floating `iframe` onto your page. All but the most trivial styles and interactions take place in the `iframe` so as not to interfere with your CSS and JavaScript.
* Animation displays in floating `iframe`.
* The user can dismiss the `iframe` and a cookie is written so it won't show again (unless you override).


#### Modal customization options:

If you define an object called `_bftn_options` before including the widget code,
you can pass some properties in to customize the default behavior.

```html
<script type="text/javascript">
  var _bftn_options = {
    /*
     * Choose from 'money', 'stop', and 'slow'. Omit this property to get the 
     * default theme.
     */
    theme: 'slow', // @type {string}
    
    /*
     * Or, if you want your own custom theme, specify its properties here.
     * Unspecified options will fall back to the default values.
     */
    theme: {
      className: 'money', // @type {string} will be applied to iframe body tag
      logos: ['images/money.png', 'images/stop.png'], // @type {Array} img src values
      headline: 'Your headline here.', // @type {string} modal headline text
      body: 'Your body here.' // @type {string} modal body text
    },
    
    /*
     * Choose from 'fp' for Free Press, 'dp' for Demand Progress or
     * 'fftf' for Fight for the Future. Omit this property to randomly split
     * form submissions between all organizations in the Battle for the Net 
     * coalition.
     */
    org: 'fftf', // @type {string}
    
    /*
     * Specify a delay (in milliseconds) before showing the widget. Defaults to one 
     * second.
     */
    delay: 1000, // @type {number}
    
    /*
     * Specify a date on which to display the widget. Defaults to July 12th, 2017 if 
     * omitted. ISO-8601 dates are UTC time, three-argument dates (with a zero-based
     * month) are local time.
     */
    date: new Date(2017, 6, 12), // @type {Date}
    
    /*
     * If you show the modal on your homepage, you should let users close it to
     * access your site. However, if you launch a new tab to open the modal, closing
     * the modal just leaves the user staring at a blank page. Set this to true to
     * prevent closing the modal - the user can close the tab to dismiss it. Defaults
     * to false.
     */
    uncloseable: false, // @type {Boolean}

    /*
     * Prevents the widget iframe from loading Google Analytics. Defaults to false.
     */
    disableGoogleAnalytics: false, // @type {Boolean}
    
    /*
     * Always show the widget. Useful for testing.
     */
    always_show_widget: true // @type {Boolean}
  };
</script>
<script src="https://widget.battleforthenet.com/widget.js" async></script>
```

# Plugins

- [Cloudflare](https://www.cloudflare.com/apps/net-neutrality)
- [Cat Signal (WordPress)](https://wordpress.org/plugins/cat-signal/)
- [Fight for the Future Alerts (WordPress)](https://wordpress.org/plugins/fftf-alerts/)
- [Net Neutrality (WordPress)](https://wordpress.org/plugins/net-neutrality/)
