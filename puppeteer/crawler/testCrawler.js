const schedule = require('node-schedule');

var getNews = require('./oinpCrawler');

var j = schedule.scheduleJob('01 33 19 * * *', () => { getNews() });