'use strict';

var faker = require('faker'),
    Chance = require('chance'),
    path = require('path'),
    fs = require('fs'),
    invariant = require('invariant'),
    vm = require('vm'),
    util = require('util'),
    _ = require('underscore');

var atImportReg = /:\s*(@import)\s+("([\w\W]*)"|'([\w\W]*)')/im;

function mock(file, options) {
	var jsonData = void 0,
	    jsonObject = {
		faker: faker,
		chance: new Chance()
	};

	invariant(path.extname(file) === '.json', 'file %s must be a .json.', file);
	invariant(fs.existsSync(file), 'file %s not found.', file);

	jsonData = fs.readFileSync(file, {
		encoding: 'utf8'
	});

	var matches = jsonData.match(atImportReg);

	if (matches && matches.length > 3) {
		var importPatial = matches[3];
		invariant(path.extname(importPatial) === '.json', '@import file %s must be a .json.', importPatial);
		invariant(fs.existsSync(importPatial), '@import file %s not found.', importPatial);
		jsonData = jsonData.replace(atImportReg, ':' + fs.readFileSync(importPatial));
	}

	var script = new vm.Script('data = ' + jsonData);

	if (!_.isUndefined(options) && !_.isUndefined(options.length)) {
		invariant(_.isNumber(options.length) && options.length > 0, 'options.length must be a number and > 0.');
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
