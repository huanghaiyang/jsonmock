const jsonmock = require('../lib/index'),
	assert = require('chai').assert;
describe('json mock one object', () => {
	it('mock a user', () => {
		let user = jsonmock('./tests/data/user.json')
		assert.typeOf(user.name, 'string')
		assert.typeOf(user.age, 'number')
		assert.typeOf(user.cf, 'string')
		assert.typeOf(user.birthday, 'date')
		assert.typeOf(user.location, 'object')
		assert.typeOf(user.location.address, 'string')
		assert.typeOf(user.location.country, 'string')
		assert.typeOf(user.location.phone, 'string')
		assert.typeOf(user.location.city, 'string')
		assert.typeOf(user.location.streetName, 'string')
	})
})