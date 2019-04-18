const fs = require('fs');
const faker = require('faker');
var fetch = require('node-fetch');

// node newSeed.js [SEED_AMOUNT]

const generateReview = () => {
	return {
		'name': faker.name.firstName(),
		'restaurant_id': faker.random.number({'min': 1, 'max': 100}),
		'city': faker.address.city(),
		'stars': faker.random.number({'min': 1, 'max': 5}),
		'pastReviews': faker.random.number(),
		'isVIP': faker.random.boolean(),
		'date': `${faker.date.between('2019-01-01', '2019-03-31').toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`,
		'review': {
			'post': faker.lorem.paragraph(),
			'overall': faker.random.number({'min': 1, 'max': 5}),
			'food': faker.random.number({'min': 1, 'max': 5}),
			'service': faker.random.number({'min': 1, 'max': 5}),
			'ambience': faker.random.number({'min': 1, 'max': 5})
		}
	}
};
	
for (let i = 1; i < 3; i++) {
	var fakeReview = generateReview();
	fetch('http://localhost:3004/api/reviews', { 
		method: 'POST',
		headers: {
			'content-type': 'application/json'		
		},
		body: JSON.stringify(fakeReview)
	})
};
