const getBrowserVersion = (bin) => {
    const execSync = require('child_process').execSync;
    let command = `${bin} --version`;
    let json = JSON.stringify(execSync(command)) || [];
    return Buffer.from(JSON.parse(json).data).toString('utf8');
};

const excludes = () => {
    let excludes = [];
    if( process.env.EXCLUDES ){
        let tests = require( 'glob' )
            .sync( 'test/**/*.spec.js' );
        let items = process.env.EXCLUDES.split(',');
        items.forEach((i)=>{
            let search_string = i.trim();
            let to_exclude = tests.filter((o)=>o.toLowerCase().includes(search_string));
            excludes = excludes.concat(to_exclude);
        });

        excludes = excludes.map((o)=> `./${o}`);
    }
    return excludes;
};

exports.config = {
	runner: 'local',
	baseUrl: process.env.BASE_URL || 'http://localhost',
	exclude: excludes(),
	services:[],
    ...require('./reporters.conf').config,
	specs: [ process.env.SPECS || './test/**/*.spec.js' ],
	logLevel: process.env.LOG_LEVEL || 'silent',
    bail: parseInt(process.env.BAIL || '0'),
    waitforTimeout: parseInt(process.env.WAIT_FOR_TIMEOUT || 180000),
    waitforInterval: parseInt(process.env.WAIT_FOR_INTERVAL || 40000),
    specFileRetries: parseInt(process.env.SPEC_RETRIES || 0),
    maxInstances: parseInt(process.env.MAX_INSTANCES || 10),
    maxInstancesPerCapability: parseInt(process.env.MAX_INSTANCES_PER_CAP || 10),
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    specFileRetries: parseInt(process.env.SPEC_RETRY || '0'),
    mochaOpts: {
        ui: 'bdd',
        timeout: 99999999,
    },
    filesToWatch: [],
	screenshotPath: './errorShots/',
	before: function (capabilities, specs) {
        require('./prepare-browser').configure(browser);
    },
	onPrepare: function() {
		console.log(`Starting: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
	},
	onComplete: function() {
		console.log(`Done: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
	},
};
