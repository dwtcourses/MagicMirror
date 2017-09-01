/* Magic Mirror Test config sample address
 *
 * By Chris van Marle
 * MIT Licensed.
 */

var config = {
	port: 8080,
	address: "0.0.0.0",
	ipWhitelist: [],

	language: "en",
	timeFormat: 24,
	units: "metric",
	electronOptions: {
		webPreferences: {
			nodeIntegration: true,
		},
	},

	modules: [
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
