#!/usr/bin/env node

const cf = require('cloudflare')({
  email: process.env.CLOUDFLARE_EMAIL,
  key: process.env.CLOUDFLARE_API_KEY
});

cf.zones.purgeCache(process.env.CLOUDFLARE_ZONE, {
  purge_everything: true
});
