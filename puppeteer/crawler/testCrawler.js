const schedule = require('node-schedule');

var getNews = require('./oinpCrawler');

<<<<<<< HEAD
var j = schedule.scheduleJob('00 08 * * *', ()=>{getNews()});
=======
var j = schedule.scheduleJob('01 39 19 * * *', () => { getNews() });
>>>>>>> 7aa2728b8927587bbb4a8f91fa2e524126f217dd
