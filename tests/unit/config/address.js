const chai = require("chai");
const expect = chai.expect;
const classMM = require("../../../js/class.js"); // require for load module.js
const moduleMM =  require("../../../js/module.js")

const request = require("request");
const os = require("os");
const ifaces = os.networkInterfaces();

describe("Listening address", function() {
	var app;

	before(function() {
		// console.log("global: ", global);
		app = require("../../../js/app.js");
	});

	after(function() {
		// console.log("global: ", global);
	});

	var forEachIp = function(callee) {
		Object.keys(ifaces).forEach(function(ifname) {
			ifaces[ifname].forEach(function(iface) {
				if("IPv4" !== iface.family || iface.internal !== false) {
					// Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
					return;
				}

				callee(iface.address);
			});
		});
	};

	var accessibleOnlyLocal = function() {
		it("Should be accessible on 127.0.0.1:8080", function(done) {
			request.get("http://127.0.0.1:8080", function (err, res, body) {
				expect(err).to.be.null;
				expect(res.statusCode).to.equal(200);
				done();
			});
		});

		forEachIp(function(ip) {
			it("Should not be accessible on "+ip+":8080", function(done) {
				request.get("http://"+ip+":8080", function (err, res, body) {
					expect(err).to.be.not.null;
					expect(err.code).to.equal("ECONNREFUSED");
					expect(res).to.be.undefined;
					done();
				});
			});
		});
	};

	var accessibleAllIps = function() {
		it("Should be accessible on 127.0.0.1:8080", function(done) {
			request.get("http://127.0.0.1:8080", function (err, res, body) {
				expect(err).to.be.null;
				expect(res.statusCode).to.equal(200);
				done();
			});
		});

		forEachIp(function(ip) {
			it("Should be accessible on "+ip+":8080", function(done) {
				request.get("http://"+ip+":8080", function (err, res, body) {
					expect(err).to.be.null;
					expect(res.statusCode).to.equal(200);
					done();
				});
			});
		});
	};

	var configFile = "";

	beforeEach(function (done) {
		global.configuration_file = configFile;
		app.start(function(config) {
			done();
		});
	});

	afterEach(function(done) {
		app.stop(function() {
			done();
		});
	});

	describe("Listening on 127.0.0.1", function() {
		before(function() {
			configFile = "tests/configs/empty_ipWhiteList.js";
		});

		accessibleOnlyLocal();
	});

	describe("Listening on 0.0.0.0", function() {
		before(function() {
			configFile = "tests/configs/zeroAddress_emptyWhitelist.js";
		});

		accessibleAllIps();
	});

	describe("Listening on empty address", function() {
		before(function() {
			configFile = "tests/configs/emptyAddress_emptyWhitelist.js";
		});

		accessibleAllIps();
	});

	describe("Listening on default address", function() {
		before(function() {
			configFile = "tests/configs/defaults.js";
		});

		accessibleOnlyLocal();
	});

});
