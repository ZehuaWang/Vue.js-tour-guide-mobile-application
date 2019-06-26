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
    let topBarSel = "div[id='nav-xshop-container'] > div[id='nav-xshop'] > a";
    const topNavBarhrefs = await page.$$eval(topBarSel, as => as.map(a => a.href));

    var dailySalelink;
    await topNavBarhrefs.forEach(href => {
        if (href.includes('todaysdeals')) { dailySalelink = href + ""; }
    });

    //await console.log(dailySalelink);

    await page.goto(dailySalelink + ""); // for now it is fixed. Need to change with the web
    await page.screenshot({ path: './img/amazon_daily_sale.png' });

    // need to get the text content of the goods and save to text for now
    var productTittleSel = "a[id='dealTitle'] > span[data-action='gbdeal-actionrecord']";
    //var productTitleText = await page.$$eval(productTittleSel, as => as.map(a => a.innerText));

    // paganation to last page
    var nextBtnSel = "ul[class='a-pagination'] > li[class='a-last']";

    // make a loop to go through all the page -> first 5
    var results = [];

    for (var i = 0; i < 99; i++) {
        await page.waitForSelector(productTittleSel);
        results = results.concat(await extractProductTitle(page, productTittleSel));
        await page.$eval(nextBtnSel, elem => elem.click());
    }

    //console.log(results);
    results.forEach(title => { console.log(title); })
    console.log(results.length);

    await browser.close();
})();

async function extractProductTitle(page, productTittleSel) {
    return page.$$eval(productTittleSel, as => as.map(a => a.innerText));
}