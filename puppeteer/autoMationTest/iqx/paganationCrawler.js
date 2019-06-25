const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors']});
    const page = await browser.newPage();

    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './download'});  
    await page.setViewport({ //TODO change the viewport according to the real page size
        width: 1920,
        height: 1768
    });

    // login
    var homeUrl = "https://chubbblind.globaliqx.com/blind/login.jsp";
    await excuteActionAndCaputerException(page, () => page.goto(homeUrl));
    await excuteActionAndCaputerException(page, () => page.type('input[name=loginName]', 'super'));
    await excuteActionAndCaputerException(page, () => page.type('input[name=passwd]',    'super'));
    await page.screenshot({path: './img/login_page.png'});

    page.click('button[type=submit]'); 
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.screenshot({path: './img/home_page.png'}); // should wait the whole page is loaded then take the snap shot   
    
    var currentIndex = 1;
    var nextBtnSel   = "li[id='homeStatisticsTable_next']";
    await page.waitForSelector(nextBtnSel);
    var nextBtnClass = await page.evaluate((nextBtnSel) => {
        var btn = Array.from(document.querySelectorAll(nextBtnSel));
        let btnHtml = btn.map(ele => {return ele.className;});
        return btnHtml;
    }, nextBtnSel);
    await console.log(nextBtnClass);
 
    if(currentIndex == 1) {

    }

    //------------------------------------------------------------------------------------
    // select the quote activity row
    var activitySel = "tbody > tr[class='draggable'] > td > a > u";
    await page.waitForSelector(activitySel);
    var quoteId = await page.evaluate((activitySel) => {
        var activityRow = Array.from(document.querySelectorAll(activitySel));
        let html = activityRow.map(ele => {
            return ele.innerHTML;
        });
        return html;
    }, activitySel);

    // write the id to file
    await fs.writeFileSync("./log/quoteId", quoteId, function(err){
        if(err) {return console.log(err);}
    })
    //------------------------------------------------------------------------------------


    await console.log(quoteId);

    await browser.close();
})();

// This function is used to excute the action like press the button and check if the page returns error
async function excuteActionAndCaputerException(page,action) {
    try{
        errorSel = await "div[class='error-summary']";
        await action();
        await page.waitForSelector(errorSel,{timeout:1000});
        let errorSummary = await page.$eval(errorSel, e=>e.innerHTML);
        if(errorSummary != '') {
            throw new Error('Error from the page: ')+ page.url() + "\n" +"Error Summary: " +errorSummary;
        }
    } catch(e) {
        if (e.toString().includes('timeout')) {return true;} // If timeout means there is no error on the page, continue
        else{console.log(e); writeToLog(e); return false;}
    }
}