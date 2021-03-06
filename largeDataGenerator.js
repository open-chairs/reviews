const fs = require("fs");
const faker = require("faker");

const totalRecords = 100e5;

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
  let firstName = faker.name.firstName();
  let restaurantId = faker.random.number({ min: 1, max: 10000000 });
  let city = cities[faker.random.number({ min: 0, max: 20 })];
  let previousReviews = faker.random.number({ min: 2, max: 100 });
  let isVip = faker.random.boolean(); 
  let date = formatFakerDate();
  let post = faker.lorem.paragraph();
  let food = faker.random.number({ min: 1, max: 5 });
  let service = faker.random.number({ min: 1, max: 5 });
  let ambience = faker.random.number({ min: 1, max: 5 });

  return `\n${firstName},${restaurantId},${city},${previousReviews},${isVip},${date},${post},${food},${service},${ambience}`;
};

const stream = fs.createWriteStream("./testReviews.csv");

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

