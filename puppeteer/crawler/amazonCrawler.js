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
    await page.waitForSelector(topBarSel);
    const topNavBarhrefs = await page.$$eval(topBarSel, as => as.map(a => a.href));

    var dailySalelink;
    await topNavBarhrefs.forEach(href => {
        if (href.includes('todaysdeals')) { dailySalelink = href + ""; }
    });

    await page.goto(dailySalelink + ""); // for now it is fixed. Need to change with the web
    await page.screenshot({ path: './img/amazon_daily_sale.png' });

    // need to get the text content of the goods and save to text for now
    var productTittleSel = "a[id='dealTitle'] > span[data-action='gbdeal-actionrecord']";

    // paganation to next page
    var nextBtnSel = "ul[class='a-pagination'] > li[class='a-last'] > a";

    // set the selector for price after deal
    var priceSel = "div.a-row.priceBlock.unitLineHeight > span.a-size-medium.inlineBlock.unitLineHeight.dealPriceText";

    // get the last page number
    var lastPageSel = "ul[class='a-pagination'] > li[class='a-disabled']";
    var lastPageNum = await getTheTotalPageNum(page, lastPageSel);
    lastPageNum = await lastPageNum.slice(-1).pop();

    // make a loop to go through all the page -> first 5
    var results = [];

    // delete the old file
    //await deleteFile("./log/productinfo");

    // change this 99 to get from the web -> paganation failed
    for (var i = 0; i < 3; i++) {
        await console.log("Process the " + i + " page");
        await page.waitForSelector(productTittleSel);
        await page.waitForSelector(priceSel);
        await page.waitForSelector(nextBtnSel);
        //results = results.concat(await extractProductTitle(page, productTittleSel)); // another issue, the product and price should be in the same line
        //results = results.concat(await combineProducttitleAndPrice(page, productTittleSel, priceSel));
        let productTitleArr = await extractProductTitle(page, productTittleSel);
        let productPriceArr = await extractProductPrice(page, priceSel);
        results = await results.concat(await combineProducttitleAndPrice(productTitleArr, productPriceArr));
        await console.log(results);
        await page.waitFor(600);
        await page.$eval(nextBtnSel, elem => elem.click());
        //await page.waitFor(500);
    }

    // Save the record to a text file in a loop
    for (var i = 0; i < results.length; i++) {
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

async function extractProductPrice(page, productPriceSel) { // issue some selector innerText is empty this also need to put in the array -> for example, some product do not have price
    return page.$$eval(productPriceSel, as => as.map(a => a.innerText));
}

// add a function to combine the product title and the product price
async function combineProducttitleAndPrice(productTittleArr, productPriceArr) {
    var result = [];
    if (productTittleArr.length == productPriceArr.length) { // This means that every product on the page has a price 

        for (let i = 0; i < productTittleArr.length; i++) {
            let comb = [];
            comb[0] = productTittleArr[i];
            comb[1] = productPriceArr[i];
            result = result.concat(comb[0] + "    " + comb[1]);
            console.log(comb);
        }
    } else {

    }
    return result;
}

async function writeToFile(content) {
    await fs.appendFileSync("./log/productinfo", content + "\n", function(err) {
        if (err) { return console.log(err); }
    });
    await console.log("The product info is saved");
}

async function getTheTotalPageNum(page, lastPageSel) {
    return page.$$eval(lastPageSel, as => as.map(a => a.innerText));
}

async function deleteFile(filePath) {
    await fs.unlink(filePath, function(err) {
        if (err) { return console.log(err); }
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
}