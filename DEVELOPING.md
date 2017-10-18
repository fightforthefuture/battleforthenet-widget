# Build

`npm run build` creates a `build` directory and adds minified versions of assets.

# Deploy

Automated deployment of minified assets to [GitHub Pages](https://pages.github.com/) happens on every commit to `master` and is handled by [CircleCI](https://circleci.com/) using a [GitHub read/write deploy key](https://circleci.com/docs/2.0/gh-bb-integration/#adding-readwrite-deployment-keys-to-github-or-bitbucket).
