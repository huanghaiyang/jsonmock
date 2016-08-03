# jsonmock
json mock framework

## install 
```
npm install jsonmock --save
```

## test
```
npm install
npm test
```

## build
```
npm run build
```

## how to use
```javascript
var jsonmock = require('../lib/index')
var user = jsonmock('./tests/data/user.json')
```

user.json must be like this:

```json
{
	"name": chance.name(),
	"age": chance.age(),
	"cf": chance.cf(),
	"birthday": chance.birthday(),
	"location": {
		"address": chance.address(),
		"country": chance.country(),
		"phone": chance.phone(),
		"city": faker.address.city(),
		"streetName": (() => {
			return faker.address.streetName()
		})()
	}
}
```

you can use [chance](http://chancejs.com/) or [faker](http://marak.github.io/faker.js/) to generate a mock data, or use ```(()=>{})()``` to caculate, but it does not support other libs or funcs.

if you want get an user array, please use like this:

```javascript
var users = jsonmock('./tests/data/user.json', {
	length: 10
})
assert.equal(users.length, 10)
```
you may use jsonmock to mock paganition...
