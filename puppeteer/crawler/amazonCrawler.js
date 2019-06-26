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
    var nextBtnSel = "ul[class='a-pagination'] > li[class='a-last'] > a";

    // make a loop to go through all the page -> first 5
    var results = [];

    // change this 99 to get from the web -> paganation failed
    for (var i = 0; i < 99; i++) {
        await console.log("Process the " + i + " page");
        await page.waitForSelector(productTittleSel);
        await page.waitForSelector(nextBtnSel);
        results = results.concat(await extractProductTitle(page, productTittleSel));
        await page.waitFor(2000);
        await page.$eval(nextBtnSel, elem => elem.click());
        //await page.click(nextBtnSel);
        await page.waitFor(2000);
        await page.screenshot({ path: './img/amazon_daily_sale'+i+'.png' });
    }

    // Save the record to a text file in a loop
    for(var i=0; i<results.length; i++) {
        await console.log(results[i]);
        await page.waitFor(10);
        await writeToFile(results[i]);
        await page.waitFor(10);
    }

    console.log(results.length);

    await browser.close();
})();

async function extractProductTitle(page, productTittleSel) {
    return page.$$eval(productTittleSel, as => as.map(a => a.innerText));
}

async function writeToFile(content) {
    await fs.appendFileSync("./log/productinfo", content+"\n", function(err){
        if(err) {return console.log(err);}
    });

    await console.log("The product info is saved");
}
