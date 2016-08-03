const faker = require('faker'),
	chance = new require('chance'),
	path = require('path'),
	fs = require('fs'),
	invariant = require('invariant')

function mock(file) {
	let jsonData
	if (path.extname(file) === '.json') {
		invariant(fs.existsSync(file), 'file not found.')
		jsonData = fs.readFileSync(file, {
			encoding: 'utf8'
		})
			
	}
}

module.exports = mock