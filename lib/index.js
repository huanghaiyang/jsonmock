'use strict';

var faker = require('faker'),
    Chance = require('chance'),
    path = require('path'),
    fs = require('fs'),
    invariant = require('invariant'),
    vm = require('vm'),
    util = require('util'),
    _ = require('underscore');

function mock(file, options) {
	var jsonData = void 0,
	    jsonObject = {
		faker: faker,
		chance: new Chance()
	};

	invariant(path.extname(file) === '.json', 'file must be a .json.');
	invariant(fs.existsSync(file), 'file not found.');

	jsonData = fs.readFileSync(file, {
		encoding: 'utf8'
	});

	var script = new vm.Script('data = ' + jsonData);

	if (!_.isUndefined(options) && !_.isUndefined(options.length)) {
		invariant(_.isNumber(options.length) && options.length > 0, 'options.length must be a number and must > 0.');
		var sandboxes = [];
		for (var i = 0; i < options.length; i++) {
			sandboxes.push(_.clone(jsonObject));
		}

		sandboxes.forEach(function (sandbox) {
			script.runInNewContext(sandbox);
		});
		return sandboxes.map(function (sandbox) {
			return sandbox.data;
		});
	} else {
		var jsonContext = vm.createContext(jsonObject);
		script.runInContext(jsonContext);
		return jsonObject.data;
	}
}

module.exports = mock;
