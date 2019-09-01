exports.config = {
    services: [
        'selenium-standalone'
    ],

    seleniumInstallArgs: {
      version : "3.141.5",
      baseURL : "https://selenium-release.storage.googleapis.com",
      drivers : {
        chrome : {
          version : "74.0.3729.6",
          arch    : process.arch,
          baseURL : "https://chromedriver.storage.googleapis.com",
        }
      }
    },

    seleniumArgs: {
      version : "3.141.5",
      drivers : {
        chrome : {
          version : "74.0.3729.6",
          arch    : process.arch,
        }
      }
    },
};
