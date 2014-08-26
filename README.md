Battle for the Net Widget
-------------------------
#### With our powers combined, we can save net neutrality!


Introduction
------------
September 10th, 2014 is [**Internet Slow Down Day!**][1] The goal of this
project is to allow anyone with a web site to run their own campaign to save net
neutrality. Simply embed a couple of lines of Javascript and you're good to go!


WARNING: Under construction!
----------------------------
The widget is still under active development, but we're providing early access
to the code so you can start integrating it into your site and testing. The
underlying architecture is mostly complete, so the code you actually embed on
your page shouldn't change much. We're just working on the user experience now.

To stay up-to-date on developments, please subscribe to our
[**developer mailing list**][1]. If you have any problems or questions regarding
the widget, please [submit an issue][4] or email <<jeff@fightforthefuture.org>>.


How it works
------------
#### Non-technical version:

* Developer embeds widget code snippet on their site (either modal or banner)
* On September 10th, 2014, users are shown the widget on their first page view
* Users can interact with or dismiss the widget
* A cookie is written so the user doesn't see the widget again

#### Technical version:

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
([**See the demo!**][2])

The modal animation will show up front-and-center on your page, prompting
visitors to contact the FCC and Congress. To install, simply embed this code:

```
<script src="//fightforthefuture.github.io/battleforthenet-widget/widget.min.js"
    async></script>
```


Installation Instructions (Banner)
----------------------------------
([**See the demo!**][3])

The banner shows up in one of the corners (you can customize), or as a strip
along the top or bottom on mobile devices. To install, use this code:

````
<script type="text/javascript">
    var _bftn_options = { animation: 'banner' }
</script>
<script src="//fightforthefuture.github.io/battleforthenet-widget/widget.min.js"
    async></script>
````

**Customization options (Banner):**

Notice the `_bftn_options` object in the code snippet above? You can pass some
other options in to customize the position of the banner on-screen.

* `position`: The position of the banner. Can be _topright_, _topleft_,
  _bottomright_ or _bottomleft_. Default is _topright_.
* `offsetX`: The number of pixels to "nudge" the banner away from the side of
  the window. Default is _20_.
* `offsetY`: The number of pixels to "nudge" the banner away from the top of the
  window. Default is _20_.
* `url`: The URL that clicking the banner should go to. In order to prevent any
  malicious activity, this can't contain any inline Javascript. Default is
  _https://www.battleforthenet.com_


How to test the widget
----------------------
**The widget is designed to only appear on September 10th, 2014**, and only
once, per user, per device. If you'd like to force it to show up on your page
for testing, please (re)load the page with #SHOW_BFTN_WIDGET in the URL.


Which browsers are supported
----------------------------
Modern browsers, and the two latest versions of Internet Explorer.


[1]: https://www.battleforthenet.com/sept10th
[2]: https://fightforthefuture.github.io/battleforthenet-widget/demos/modal.html
[3]: https://fightforthefuture.github.io/battleforthenet-widget/demos/banner.html
[4]: https://github.com/fightforthefuture/battleforthenet-widget/issues