const jsonmock = require('../lib/index'),
	assert = require('chai').assert;
describe('json mock a web', () => {
	it('mock a web', () => {
		let web = jsonmock('./tests/data/web.json')
		assert.typeOf(web.domain, 'string')
		assert.typeOf(web.ip, 'object')
		assert.typeOf(web.ip.ipv4, 'string')
		assert.typeOf(web.ip.ipv6, 'string')
	})
})