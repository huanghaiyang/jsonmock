const jsonmock = require('../lib/index'),
	assert = require('chai').assert;
describe('json mock object arr', () => {
	it('mock a user list', () => {
		let users = jsonmock('./tests/data/user.json', {
			length: 10
		})
		assert.equal(users.length, 10)
	})
})