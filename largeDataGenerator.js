const fs = require("fs");
const faker = require("faker");

//const totalRecords = 100000000;
const totalRecords = 10e6;

// Note that this datashape is flatter than what was originally designed (contains review obj)
// front-end components will require some refactoring to handle this dataset
// Flattened fields: name,restaurant_id,city,stars,pastReviews,isVIP,date,post,overall,food,service,ambience

const generateReview = () => {
  return {
    name: faker.name.firstName(),
    restaurant_id: faker.random.number({ min: 1, max: 100000000 }),
    city: faker.address.city(),
    star: faker.random.number({ min: 1, max: 5 }),
    pastReviews: faker.random.number(),
    isVIP: faker.random.boolean(),
    date: `${faker.date.between("2019-01-01", "2019-03-31")}`,
    post: faker.lorem.paragraph(),
    overall: faker.random.number({ min: 1, max: 5 }),
    food: faker.random.number({ min: 1, max: 5 }),
    service: faker.random.number({ min: 1, max: 5 }),
    ambience: faker.random.number({ min: 1, max: 5 })
  };
};

function formatFakerDate() {
  var date = new Date(
		faker.date.between("2019-01-01","2019-03-31")),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

const exampleReview = '\nAlanis,1030904,East Lenny,14036,false,2019-03-30,Assumenda quia numquam omnis qui quae consequatur doloremque hic non. Odit ea a laboriosam tempore ipsam dolorem. Quidem repellendus quia numquam. Ut omnis a fugiat. At modi voluptatem. Quo aut soluta repellat debitis est.,2,5,1';

/*
// Function used to generate reviews record
// Fields: name,restaurant_id,city,(*stars*),pastReviews,isVIP,date,post,(*overall*),food,service,ambience
// --> *stars* & *overall* should be calculated - omit field from db
const generateReviewCSV = () => {
  return `\n${faker.name.firstName()},${faker.random.number({
    min: 1,
    max: 100000000
  })},${faker.address.city()},${faker.random.number()},${faker.random.boolean()},${faker.date.between(
    "2019-01-01",
    "2019-03-31"
  )},${faker.lorem.paragraph()},${faker.random.number({
    min: 1,
    max: 5
  })},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({
    min: 1,
    max: 5
  })}`;
};
*/

const generateReviewCSV = () => {
  return '\nAlanis,1030904,East Lenny,14036,false,2019-03-30,Assumenda quia numquam omnis qui quae consequatur doloremque hic non. Odit ea a laboriosam tempore ipsam dolorem. Quidem repellendus quia numquam. Ut omnis a fugiat. At modi voluptatem. Quo aut soluta repellat debitis est.,2,5,1'
  // return `\n${faker.name.firstName()},${faker.random.number({
  //   min: 1,
  //   max: 100000000
  // })},${faker.address.city()},${faker.random.number()},${faker.random.boolean()},${faker.date.between(
  //   "2019-01-01",
  //   "2019-03-31"
  // )},${faker.lorem.paragraph()},${faker.random.number({
  //   min: 1,
  //   max: 5
  // })},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({
  //   min: 1,
  //   max: 5
  // })}`;
};

const stream = fs.createWriteStream("./reviewsData.csv");

function writeManyReviews() {
  let count = totalRecords;
	writeReviews();

  function writeReviews() {
    let okToLoad = true;
    do {
      count--;
      if (count === 0) {
        stream.write(generateReviewCSV());
      } else {
        okToLoad = stream.write(generateReviewCSV());
      }
    } while (count > 0 && okToLoad);
    if (count > 0) {
      stream.once("drain", writeReviews);
    }
  }
}

writeManyReviews();

/*
// will take 25 hrs (linear extrapolation from 1M records) to run
// fail when generating 10M records
const reviewStream = fs.createWriteStream('./test.csv');

for (let i = 0; i <= totalRecords; i++) {
	reviewStream.write(generateReviewCSV());
}

reviewStream.end();
*/

/*
// will take 25 hrs (linear extrapolation from 100k records) to run...
while (writtenRecords < totalRecords) {
	const batch = 1000;
	const records = [];
	for (let i = 0; i <= batch; i++) {
		records.push(generateReviewCSV());
	}
	fs.appendFileSync('reviews.csv', records.join(''), (err) => {
		if (err) throw err;
	});
	writtenRecords += batch;
}
*/

/*
writer.pipe(fs.createWriteStream('testData.csv'));

for (let i = 0; i < totalRecords; i++) {
	writer.write(generateReview())
};

writer.end;
*/