const schedule = require('node-schedule');

var getNews = require('./oinpCrawler');

var j = schedule.scheduleJob('43 8 * * *', ()=>{getNews()});