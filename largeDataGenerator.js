const fs = require('fs');
const faker = require('faker');

const csvWriter = require('csv-write-stream')
const writer = csvWriter()

//const totalRecords = 100000000;
const totalRecords = 100;
let writtenRecords = 0;

const generateReview = () => {
	return {
		'name': faker.name.firstName(),
		'restaurant_id': faker.random.number({'min': 1, 'max': 100}),
		'city': faker.address.city(),
		'stars': faker.random.number({'min': 1, 'max': 5}),
		'pastReviews': faker.random.number(),
		'isVIP': faker.random.boolean(),
		'date': `${faker.date.between('2019-01-01', '2019-03-31').toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}`,
		'post': faker.lorem.paragraph(),
		'overall': faker.random.number({'min': 1, 'max': 5}),
		'food': faker.random.number({'min': 1, 'max': 5}),
		'service': faker.random.number({'min': 1, 'max': 5}),
		'ambience': faker.random.number({'min': 1, 'max': 5})
	}
};

writer.pipe(fs.createWriteStream('testData.csv'));

for (let i = 0; i < totalRecords; i++) {
	writer.write(generateReview())
};

writer.end;