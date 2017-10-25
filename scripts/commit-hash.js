#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function commitHash() {
  const { stdout, stderr } = await exec('git rev-parse HEAD');
  return stdout.trim();
};
