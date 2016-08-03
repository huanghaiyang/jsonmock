const jsonmock = require('../lib/index'),
	assert = require('chai').assert;
describe('json mock a web', () => {
	it('mock a web', () => {
		let web = jsonmock('./tests/data/web.json')
	})
})