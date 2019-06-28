const schedule = require('node-schedule');

var getNews = require('./oinpCrawler');

var j = schedule.scheduleJob('01 39 19 * * *', () => { getNews() });