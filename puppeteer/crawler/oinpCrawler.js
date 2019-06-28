const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const os = require('os');
module.exports = (async() => {

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1768
    });

    await page.goto("https://www.ontario.ca/page/2019-ontario-immigrant-nominee-program-updates");
    await page.waitFor(2000);
    await page.screenshot({ path: './img/oinp/oinp_news.png' });

    var titleSel = "div[id='pagebody'] > h4";
    var dateSel = "div[id='pagebody'] > h3";
    var titleArr = await getNewsTitle(page, titleSel);
    var dateArr = await getNewsTitle(page, dateSel);

    for (var i = 0; i < titleArr.length; i++) {
        if (titleArr[i].includes('Masters')) {
            await console.log(titleArr[i]);
        }
    }

    await sendEmail(titleArr, dateArr);

    await browser.close();
});

async function getNewsTitle(page, titleSel) {
    return page.$$eval(titleSel, as => as.map(a => a.innerText));
}

async function sendEmail(info, date) {

    var contentText = await changeLineForArr(info) + '';
    var dateText = await changeLineForArr(date) + ''; // need to add date with the title

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zehuawang1994@gmail.com',
            pass: '839908858'
        }
    });

    // 'zilijing123@gmail.com' -> middle gmail
    // 'transforminottawa@gmail.com' -> Eric gmail
    var mailOptions = {
        from: 'zehuawang1994@gmail.com',
        to: 'transforminottawa@gmail.com',
        subject: 'OINP News',
        text: contentText
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

async function changeLineForArr(arr) {
    let res = '';

    for (let i = 0; i < arr.length; i++) {
        res = os.EOL+ os.EOL + res + arr[i] + os.EOL + os.EOL;
    }

    //console.log(res);

    return res;
}