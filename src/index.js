const faker = require('faker'),
	Chance = require('chance'),
	path = require('path'),
	fs = require('fs'),
	invariant = require('invariant'),
	vm = require('vm'),
	util = require('util'),
	_ = require('underscore')

const atImport = '@import'

function mock(file, options) {
	let jsonData, jsonObject = {
		faker: faker,
		chance: new Chance()
	}

	invariant(path.extname(file) === '.json', 'file must be a .json.')
	invariant(fs.existsSync(file), 'file not found.')

	jsonData = fs.readFileSync(file, {
		encoding: 'utf8'
	})

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