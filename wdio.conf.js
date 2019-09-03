const base = require('./conf/base.conf');
const commandLineArgs = require('command-line-args')
const options = commandLineArgs([
    { name: 'search', alias: 's', type: String, multiple: true },
    { name: 'show', type: Boolean, defaultOption: false },
    { name: 'debug', alias: 'd', type: Boolean },
    { name: 'verbose', alias: 'v', type: Boolean },
    { name: 'src', type: String, multiple: true, defaultOption: true },
    { name: 'suite', type: String, multiple: false, defaultOption: 'all' },
    { name: 'timeout', alias: 't', type: Number },
    { name: 'max', alias: 'm', type: Number }
    //window size
]);

const all = require('glob').sync('./test/**/*.spec.js');
let tests = [];

if( options.search ){
    for (var i = 0; i < options.search.length; i++) {
        const search = options.search[i];
        const matches = all.filter( (o) => o.includes(search) );
        if( matches.length ){
            tests = [...new Set([...tests, ...matches ])]
        }
    }
} else {
    tests = all;
}

global.options = options;
console.log(tests);

//require('child_process').execSync('ls').toString()

exports.config = {
    ...require('./conf/base.conf').config,
    specs: tests,
    execArgv: options['debug'] ? ['--inspect'] : [],
    maxInstances: options['debug'] ? 1 : 100,
    services: [
        'selenium-standalone'
    ],
    suites: {
        all: [ './test/**/*.spec.js' ],
        injection: [
            './test/injection/*.spec.js',
        ],
        sql: [
            // ...
        ]
    },
    //...require('./conf/selenium.conf').config,
    capabilities: [
        {
            browserName: 'chrome',
            "goog:chromeOptions": {
                //binary: `${require('puppeteer').executablePath()}`,
                args: [ 
                    ...[ options['show'] ? '' : '--headless' ],
                    '--disable-gpu',
                    '--disable-infobars',
                    '--fast-start',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    `--window-size=${800},${600}`,
                    //'--auto-open-devtools-for-tabs',
                ].filter(Boolean),
            }
        }
    ],
    afterTest: (test) => {
        console.log(`Finished test "${test.parent} - ${test.title}"`);
        if( options.debug ){
            require("@babel/register");
            const home = require('./page-objects/home.page.js');
            global.home = home.default;
            browser.debug();
        }
    }
}
