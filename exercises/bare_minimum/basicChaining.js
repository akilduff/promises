/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

  // (1) to get Github username, invoke pluckFirstLineFromFileAsync

  // (2) to get Github profile, invoke getGitHubProfileAsync

  // (3) to write to file, use fs.writeFileasync!

  return pluckFirstLineFromFileAsync(readFilePath)
    .then(getGitHubProfileAsync)
    .then((data) => {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(data));
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
