const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3004;

const db = require('./db');
const foodProcessorAPI_KEY = require('./foodparser.config.js');

const public = path.join(__dirname, '../client/dist');

app.use(cors());
app.use(morgan('dev'));

app.use('/', express.static(public));

app.get('/api/reviews/:id', (req, res) => {
	let id = req.params.id;
	db.get(id, (err, results) => {
		if (err) { res.statusCode(500).send(err) }
		else {res.send(results.rows)};
	});
});

app.post('/api/foodtext', parser.text(), (req, res) => {
	console.log('FOODTEXT:', req.body);
	fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/detect', {
		method: 'POST', 
		headers: {
			'X-RapidAPI-Key': foodProcessorAPI_KEY,
			'ContentType': 'application/x-www-form-urlencoded'
		},
		body: `text=${req.body}`
	})
	.then(res => res.json())
	.then(json => res.send(json))
	.catch(err => res.send(404))
})

app.use('/(\\d+)/', express.static(public));

app.listen(port, () => {
  console.log(`Express reviews server running at: http://localhost:${port}`);
});