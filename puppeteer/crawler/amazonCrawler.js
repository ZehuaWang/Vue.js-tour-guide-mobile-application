const fs = require('fs');
const puppeteer = require('puppeteer');
(async() => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    // Set the view port big enough to view the full page
    await page.setViewport({
        width: 1920,
        height: 1768
    });
    await page.goto("https://www.amazon.ca/");

    //go to the first page of amazon
    await page.screenshot({ path: './img/amazon_home.png' });


    // click deals store tag and do screen shot
    // get the link of top nav bar
    let topBarSel = "div[id='nav-xshop'] > a"
    const hrefs = await page.$$eval(topBarSel, as => as.map(a => a.href));

    await console.log(hrefs);


    await browser.close();
})();