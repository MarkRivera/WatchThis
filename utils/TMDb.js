const rq = require('request');
const config = require('config');

const TMDb = {	
	getRandomNumber: (min, max)  => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	},
}

module.exports = TMDb;
