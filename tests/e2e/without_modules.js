const Application = require("spectron").Application;
const path = require("path");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

var electronPath = path.join(__dirname, "../../", "node_modules", ".bin", "electron");

if (process.platform === "win32") {
	electronPath += ".cmd";
}

var appPath = path.join(__dirname, "../../js/electron.js");

var app = new Application({
	path: electronPath,
	args: [appPath]
});

global.before(function () {
	chai.should();
	chai.use(chaiAsPromised);
});



describe("Check configuration without modules", function () {
	this.timeout(10000);

	before(function() {
		// Set config sample for use in test
		process.env.MM_CONFIG_FILE = "tests/configs/without_modules.js";
	});

	beforeEach(function (done) {
		app.start().then(function() { done(); } );
	});

	afterEach(function (done) {
		app.stop().then(function() { done(); });
	});

	it("Show the message create file config", function () {
		return app.client.waitUntilWindowLoaded()
			.getText('#module_2_helloworld .module-content').should.eventually.equal("Please create a config file.")
	});

	it("Show the message create file config 2", function () {
		return app.client.waitUntilWindowLoaded()
			.getText('#module_2_helloworld .module-content').should.eventually.equal("Please create a config file.")
	});


});

