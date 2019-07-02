const schedule = require('node-schedule');

var getNews = require('./oinpCrawler');

var j = schedule.scheduleJob('00 08 * * *', ()=>{getNews()});