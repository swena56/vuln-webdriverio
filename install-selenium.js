var selenium = require('selenium-standalone');
 
//curl https://chromedriver.storage.googleapis.com/LATEST_RELEASE_74
/*
selenium-standalone install --drivers.chrome.version="$(curl https://chromedriver.storage.googleapis.com/LATEST_RELEASE_74)"
require('request').get('https://chromedriver.storage.googleapis.com/LATEST_RELEASE_74',(e,d)=>{console.log(d.body)})
*/
selenium.install({
  version: '3.8.1',
  baseURL: 'https://selenium-release.storage.googleapis.com',
  drivers: {
    chrome: {
      version: '74.0.3729.6',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    },
    ie: {
      version: '3.9.0',
      arch: process.arch,
      baseURL: 'https://selenium-release.storage.googleapis.com'
    }
  },
  requestOpts: { // see https://github.com/request/request#requestoptions-callback
    timeout: 10000
  },
  logger: function(message) {
 
  },
  progressCb: function(totalLength, progressLength, chunkLength) {
 
  }
},()=>{
  console.log('Done')

});