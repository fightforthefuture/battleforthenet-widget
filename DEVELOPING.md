# Develop

`npm run watch` will watch the [src](https://github.com/fightforthefuture/battleforthenet-widget/tree/master/src) directory for changes. Open [demos/modal.html](https://github.com/fightforthefuture/battleforthenet-widget/blob/master/src/demos/modal.html) in a web browser to test the widget.

# Build

`npm run build` creates a `dist` directory and adds minified versions of assets.

# Deploy

Automated deployment of minified assets and generated files to Amazon S3 happens on every commit to `master` and is handled by [CircleCI](https://circleci.com/gh/fightforthefuture/battleforthenet-widget/tree/master).
