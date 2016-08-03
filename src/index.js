const faker = require('faker'),
	Chance = require('chance'),
	path = require('path'),
	fs = require('fs'),
	invariant = require('invariant'),
	vm = require('vm'),
	util = require('util'),
	_ = require('underscore')

const atImportReg = /:\s*(@import)\s+("([\w\W]*)"|'([\w\W]*)')/im

function mock(file, options) {
	let jsonData, jsonObject = {
		faker: faker,
		chance: new Chance()
	}

	invariant(path.extname(file) === '.json', 'file %s must be a .json.', file)
	invariant(fs.existsSync(file), 'file %s not found.', file)

	jsonData = fs.readFileSync(file, {
		encoding: 'utf8'
	})

	let matches = jsonData.match(atImportReg)

	if (matches && matches.length > 3) {
		let importPatial = matches[3]
		invariant(path.extname(importPatial) === '.json', '@import file %s must be a .json.', importPatial)
		invariant(fs.existsSync(importPatial), '@import file %s not found.', importPatial)
	}

	let script = new vm.Script('data = ' + jsonData);

	if (!_.isUndefined(options) && !_.isUndefined(options.length)) {
		invariant(_.isNumber(options.length) && options.length > 0, 'options.length must be a number and > 0.')
		let sandboxes = []
		for (let i = 0; i < options.length; i++) {
			sandboxes.push(_.clone(jsonObject))
		}

		sandboxes.forEach((sandbox) => {
			script.runInNewContext(sandbox);
		})
		return sandboxes.map((sandbox) => {
			return sandbox.data
		})
	} else {
		let jsonContext = vm.createContext(jsonObject)
		script.runInContext(jsonContext)
		return jsonObject.data
	}
}

module.exports = mock