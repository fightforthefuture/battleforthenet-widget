Battle for the Net Widget
-------------------------
#### Join the battle for net neutrality with our action widget!

September 10th, 2014 is [**the Internet Slowdown!**][1] The goal of this
project is to allow anyone with a web site to run their own campaign to save net
neutrality. Simply embed a couple of lines of Javascript and you're good to go!

To stay up-to-date on developments, please subscribe to our
[**developer mailing list**][1]. If you have any problems or questions regarding
the widget, please [submit an issue][4] or [email Jeff Lyon][5].


How it works
------------
#### Non-technical version:

* Developer embeds widget code snippet on their site (either modal or banner)
* On September 10th, 2014, users are shown the widget on their first page view
* Users can interact with or dismiss the widget
* A cookie is written so the user doesn't see the widget again

#### Technical version:
Please take a look at [**widget.js**][6] if you want to see exactly what you'll
be embedding on your page.

* Compatible with Firefox, Chrome, Safari and Internet Explorer 10+
* Embed the widget Javascript code on your page
* Optionally pass in customization parameters (see below), or defaults are used
* Widget checks to make sure it should be shown (September 10th 2014 and hasn't
  been shown to this user before, via cookie). You can override this check for
  testing purposes
* Widget preloads any images required for the chosen animation
* Widget injects a floating `iframe` onto your page. All but the most trivial
  styles and interactions take place in the `iframe` so as not to interfere with
  your CSS and Javascript
* Animation displays in floating `iframe`
* The user can dismiss the `iframe` and a cookie is written so it won't show
  again (unless you override)


Installation Instructions (Modal)
---------------------------------
**See the demo:** [**Development version**][2]

![Modal](https://fightforthefuture.github.io/battleforthenet-widget/demos/modal.png)

The modal animation will show up front-and-center on your page, prompting
visitors to contact the FCC and Congress.

**To show the modal on September 10th, paste this into your `HEAD`:**
```html
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```

#### Modal customization options:

If you define an object called `_bftn_options` before including the widget code,
you can pass some properties in to customize the default behavior.

* `skipEmailSignup`: (Boolean, default _false_) Disables the email signup and
  only shows the Call Congress tool.
* `skipCallTool`: (Boolean, default _false_) Disables the Call Congress tool and
  only shows the email signup form. Creates a quantum singularity if the
  `skipEmailSignup` option is also used.
* `fastAnimation`: (Boolean, default _false_) Fast forwards through the intro
  animation and makes the action form appear much faster.

#### Customized modal examples:

**Call Congress modal with email signup disabled. Paste this into your `HEAD`:**
```html
<script type="text/javascript">
    var _bftn_options = {
      skipEmailSignup: true
    }
</script>
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```

**Modal with Call Congress tool disabled. Paste this into your `HEAD`:**
```html
<script type="text/javascript">
    var _bftn_options = {
      skipCallTool: true
    }
</script>
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```


Installation Instructions (Banner)
----------------------------------
**See the demo:** [**Light**][3] | [**Dark**][7]

![Banners](https://fightforthefuture.github.io/battleforthenet-widget/demos/banner.png)

The banner shows up in one of the corners (you can customize), or as a strip
along the top or bottom on mobile devices. You can choose a light or dark theme.

**To show the banner on September 10th, paste this code into your `HEAD` tag:**
```html
<script type="text/javascript">
    var _bftn_options = { animation: 'banner' }
</script>
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```

#### Banner customization options:

Notice the `_bftn_options` object in the code snippet above? You can pass some
other options in to customize the position of the banner on-screen.

* `theme`: The theme. Either _light_ (default) or _dark_
* `position`: The position of the banner. Can be _topright_ (default) or
  _bottomright_
* `offsetY`: The number of pixels to "nudge" the banner away from the top of the
  window
* `url`: The URL that clicking the banner should go to. Default is
  _https://www.battleforthenet.com_

#### Customized banner examples:

**Banner with dark theme, bottom right corner. Paste this into your `HEAD`:**
```html
<script type="text/javascript">
    var _bftn_options = {
      animation: 'banner',
      position: 'bottomright',
      theme: 'dark'
    }
</script>
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```

**Banner with custom link, paste this into your `HEAD`:**
```html
<script type="text/javascript">
    var _bftn_options = {
      animation: 'banner',
      url: 'https://www.YOURPETITIONPAGEHERE.org'
    }
</script>
<script src="//widget.battleforthenet.com/widget.min.js" async></script>
```


How to test the banner/modal
----------------------------
**The widget is designed to only appear on September 10th, 2014**, and only
once, per user, per device. If you'd like to force it to show up on your page
for testing, please (re)load the page with #SHOW_BFTN_WIDGET in the URL.


Embed the Modal on your blog
----------------------------
If you want to show off the modal to your users prior to September 10th
(thanks!) you can use this code to directly embed it on your page:

**To embed the action form on your page, use this code:**
```html
<iframe style="width: 750px; height: 467px;" frameborder="no"
  src="https://widget.battleforthenet.com/iframe/modal.html#EMBED">
  </iframe>
```


Which browsers are supported
----------------------------
Modern browsers, and the two latest versions of Internet Explorer (10 and 11).


[1]: https://www.battleforthenet.com/sept10th
[2]: https://widget.battleforthenet.com/demos/modal.html
[3]: https://widget.battleforthenet.com/demos/banner.html
[4]: https://github.com/fightforthefuture/battleforthenet-widget/issues
[5]: mailto:jeff@fightforthefuture.org
[6]: https://github.com/fightforthefuture/battleforthenet-widget/blob/master/widget.js
[7]: https://widget.battleforthenet.com/demos/banner.dark.html
