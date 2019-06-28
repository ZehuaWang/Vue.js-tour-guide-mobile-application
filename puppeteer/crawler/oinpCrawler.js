const puppeteer = require('puppeteer');
(async() => {

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
    var titleArr = await getNewsTitle(page, titleSel);

    for (var i = 0; i < titleArr.length; i++) {
        if (titleArr[i].includes('Masters')) {
            await console.log(titleArr[i]);
        }
    }

    await console.log(titleArr.length) + "news in total";

    await browser.close();
})();

async function getNewsTitle(page, titleSel) {
    return page.$$eval(titleSel, as => as.map(a => a.innerText));
}