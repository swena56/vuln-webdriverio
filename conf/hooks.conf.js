exports.config = {
	onPrepare: function (config, capabilities) {
	},
	beforeSession: function (config, capabilities, specs) {
	},
	before: function (capabilities, specs) {
		require('./prepare-browser').configure(browser);
	},
	beforeSuite: function (suite) {
	},
	beforeHook: function () {
	},
	afterHook: function () {
	},
	beforeTest: function (test) {
	},
	beforeCommand: function (commandName, args) {
	},
	afterCommand: function (commandName, args, result, error) {
	},
	afterTest: function (test) {
	},
	afterSuite: function (suite) {
	},
	after: function (result, capabilities, specs) {
	},
	afterSession: function (config, capabilities, specs) {
	},
	onComplete: function (exitCode, config, capabilities, results) {
	},
	onReload: function(oldSessionId, newSessionId) {
	},
	beforeFeature: function (uri, feature) {
	},
	beforeScenario: function (uri, feature, scenario) {
	},
	beforeStep: function (uri, feature, scenario, step) {
	},
	afterStep: function (uri, feature, scenario, step, result) {
	},
	afterScenario: function (uri, feature, scenario, result) {
	},
	afterFeature: function (uri, feature) {
	}
};