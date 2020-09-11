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
Promise.promisifyAll(request);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // (1) to get Github username, invoke pluckFirstLine
  console.log('Get Github name');
  return fs.readFile(readFilePath)
    .then(function(fileData) {
      if (fileData) {
        var dataString = fileData.toString();
        var endOfLine = dataString.search(/$/gm);
        var githubName = dataString.slice(0, endOfLine);
        // console.log(githubName);
        return githubName;
      } else {
        throw new Error;
      }
    })
  // (2) to get profile, invoke getGitHubProfile
    .then(function(newGithubName) {
      var options = {
        url: 'https://api.github.com/users/' + newGithubName,
        headers: { 'User-Agent': 'request' },
        json: true
      };
      console.log(request.get(options));
      return request.get(options);
    })
  // (3) then JSON parse and invoke fs.writeFile
    .then(function(githubProfile) {
      return fs.writeFile(writeFilePath, githubProfile);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
