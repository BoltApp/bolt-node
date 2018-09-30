const fs = require('fs');
const shell = require('shelljs');
const userSecrets = require('../secrets.js');

/**
 * Check that the ngrok executable exists
 */
if (!fs.existsSync(`${process.cwd()}/ngrok`)) {
  console.error(
    '\x1b[37m\x1b[41m%s\x1b[0m',
    ' You don’t have the ngrok executable in your folder! Please install the one working for your platform from https://ngrok.com/. ',
  );
  process.exit();
}

/**
 * Login to ngrok
 */
if (!userSecrets || !userSecrets.ngrokURL || !userSecrets.ngrokToken) {
  console.error(
    '\x1b[37m\x1b[41m%s\x1b[0m',
    ' You have not properly setup your secrets.js files at the root of your dev folder. See readme. ',
  );
  process.exit();
}

/**
 * Login to ngrok
 */
shell.exec(`${process.cwd()}/ngrok authtoken ${userSecrets.ngrokToken}`, {
  silent: true,
});

/**
 * Output the url to start the ngrok command
 */
process.stdout.write(userSecrets.ngrokURL);
