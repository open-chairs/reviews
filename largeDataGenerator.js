const fs = require("fs");
const faker = require("faker");

//const totalRecords = 100000000;
const totalRecords = 100;

//format date to YYYY-MM-DD
function formatFakerDate() {
  var date = new Date(faker.date.between("2019-01-01", "2019-03-31")),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

//random cities
const cities = [
  "New York",
  "New Jersey",
  "Los Angeles",
  "San Jose",
  "Austin",
  "Columbus",
  "Milwaukee",
  "Kansas City",
  "Buffalo",
  "Winston–Salem",
  "Savannah",
  "Syracuse",
  "Cheyenne",
  "Seattle",
  "Lafayette",
  "Adelaide",
  "Sydney",
  "Melbourne",
  "Perth",
  "Brisbane",
  "Penang"
];

// Function used to generate reviews record. Fields:
// name,restaurant_id,city,pastReviews,isVIP,date,post,food,service,ambience
// --> *stars* & *overall* should be calculated - omit field from db
// This datashape is flatter than what was originally designed (contains review obj)
const generateReviewCSV = () => {
  return `\n${faker.name.firstName()},${faker.random.number({
    min: 1,
    max: 100000000
  })},${
    cities[faker.random.number({ min: 0, max: 20 })]
  },${faker.random.number()},${faker.random.boolean()},${formatFakerDate()},${faker.lorem.paragraph()},${faker.random.number(
    { min: 1, max: 5 }
  )},${faker.random.number({ min: 1, max: 5 })},${faker.random.number({
    min: 1,
    max: 5
  })}`;
};

const stream = fs.createWriteStream("./testData.csv");

function writeManyReviews() {
  let count = totalRecords;
  stream.write(
    "name,restaurant_id,city,pastReviews,isVIP,date,post,food,service,ambience"
  );
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
