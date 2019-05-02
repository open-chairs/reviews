const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool(config);
pool.connect();

const get = (id, cb) => {
	pool.query(`SELECT * FROM reviews WHERE restaurant_id = ${id} ORDER BY date DESC`, (err, res) => {
		if (err) {
			cb(err);
		} else {
			cb(err,res);
		}
	})
}

module.exports = {
	get
};

/*
const { Pool, Client } = require('pg');
const config = require('./config.js');

const client = new Client(config);
client.connect();

const get = (id, cb) => {
	client.query(`SELECT * FROM reviews WHERE restaurant_id = ${id} ORDER BY date DESC`, (err, res) => {
		if (err) {
			cb(err);
		} else {
			cb(err,res);
		}
	})
}

module.exports = {
	get
};
*/