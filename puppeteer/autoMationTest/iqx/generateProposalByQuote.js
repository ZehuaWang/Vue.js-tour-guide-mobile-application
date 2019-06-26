// This script is used to generate a proposal by quote id. -> For CHUBB. 
const puppeteer = require('puppeteer');

module.exports = (async(quoteId) => {

    // Initialize the environment
    var start = await new Date().getTime();
    
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
    await page.screenshot({path: './img/home_page.png'});

    // quote search
    var quoteId = quoteId+ '';
    await page.type('input[name=externalId]',quoteId);
    await page.screenshot({path: './img/id_search.png'});


    var goSel = "input[id='submit.go']";
    await page.evaluate((goSel) => {
        var goBtn = document.querySelector(goSel);
        goBtn.click();
    }, goSel);
    
    await page.waitForNavigation({waitUntil: 'networkidle0'});

    await page.screenshot({path: './img/quote_search_result_overview.png'}); // This is the overview tab

    // Go to the proposal tab
    var proposalTabUrl = "https://chubbblind.globaliqx.com/blind/quote/edit/proposal/proposalSelection.page";
    excuteActionAndCaputerException(page, () => page.goto(proposalTabUrl));
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.screenshot({path: './img/quote_proposal_selection.png'}); // This is the overview tab

    // Go to the proposal general tab
    var generateproposalUrl = "https://chubbblind.globaliqx.com/blind/quote/edit/proposal/generateProposal.page";
    excuteActionAndCaputerException(page, () => page.goto(generateproposalUrl));
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.screenshot({path: './img/quote_proposal_generate.png'});

    // Click the generate proposal btn
    var generateProposalSel = "input[id='proposal.submit.generateProposal']";
    await page.evaluate((generateProposalSel) => {
        var generateBtn = document.querySelector(generateProposalSel);
        generateBtn.click();
    }, generateProposalSel);

    await page.waitForNavigation({waitUntil: 'networkidle0'});

    await page.screenshot({path: './img/quote_proposal_download.png'});

    // TODO Set a time to downlaod the proposal automatically
    // Set 25 seconds to allow the download of proposal
    
    await console.log("Downloading proposal for quote: " + quoteId);

    //await browser.close();
});

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

function delay(time) {
    var now = Date.now;
    var end = Date.now;
    while(end - now < 3000) {
        end = Date.now;
    }
}