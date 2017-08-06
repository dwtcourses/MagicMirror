const helpers = require("./global-setup");
const path = require("path");
const request = require("supertest");

const expect = require("chai").expect;

const describe = global.describe;
const it = global.it;
const before = global.before;
const after = global.after;


describe("ServerOnly test", function () {

	helpers.setupTimeout(this);

	
	var instanceApp = null;

	before(function () {

		process.env.MM_CONFIG_FILE = "tests/configs/port_8090.js";
		const app = require("../../js/app.js");



		app.start(function(config) {
			console.log("Init serveronly mode");
			instanceApp = this;
		});
	});

	after(function () {
		// 
		// do something
		// 
	});


	it("should return port 8090", function (done) {
		expect(instanceApp.config.port).to.equal(8090);
	});
});
