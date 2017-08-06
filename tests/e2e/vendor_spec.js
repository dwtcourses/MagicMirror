const helpers = require("./global-setup");
const path = require("path");
const request = require("supertest");

const expect = require("chai").expect;
const assert = require("chai").assert;

const describe = global.describe;
const it = global.it;
const before = global.before;
const after = global.after;

describe("Vendors", function () {

	helpers.setupTimeout(this);

	var app = null;

	before(function () {
		return helpers.startApplication({
			args: ["js/electron.js"]
		}).then(function (startedApp) { app = startedApp; })
	});

	after(function () {
		return helpers.stopApplication(app);
	});

	describe("Get list vendors", function () {

		before(function () {
			client = request.agent("http://localhost:8080");
			process.env.MM_CONFIG_FILE = "tests/configs/env.js";
		});

		var vendors = require(__dirname + "/../../vendor/vendor.js");
		Object.keys(vendors).forEach(vendor => {
			it(`should return 200 HTTP code for vendor "${vendor} and ContentType"`, function () {
				urlVendor = "/vendor/" + vendors[vendor];


				client.get(urlVendor)
					.expect("Content-type", /css|javascript/)
					.expect(200)
					.end(function(err,res) {
						if(err) {
							console.log("error " + err);
							return;
						}
						assert.equal(res.status, 200);
						done();
					});
			});
		});
	});
});
