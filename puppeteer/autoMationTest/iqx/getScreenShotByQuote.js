// login to elm quoting and save work flow of a specific quote as image
// Add external configuration file
// TODO: 1. Find the second level heref 2. Create a config file for the script to read 3. Make this a module

const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config/config.properties');
const puppeteer = require('puppeteer');
(async () => {
    console.log('The quote id being test is: '+properties.get('quoteId'));
    var start = await new Date().getTime();
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setViewport({ //TODO change the viewport according to the real page size
        width: 1920,
        height: 1768
    })
    var homeUrl = properties.get('homeUrl')+'';
    await page.goto(homeUrl);
    await page.type('input[name=loginName]', 'super');
    await page.type('input[name=passwd]', 'super');
    await page.screenshot({path: './img/login_page.png'});
    
    page.click('button[type=submit]'); 
    // navigate to homeStatistics.page and take a snap shot
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.screenshot({path: './img/home_page.png'}); // should wait the whole page is loaded then take the snap shot
    
    // workflow 1 -> search a specific quote
    var quoteId = properties.get('quoteId')+''; // quote id should read from the config file
    await page.type('input[name=externalId]',quoteId);
    await page.screenshot({path: './img/id_search.png'});
    page.click('button[type=submit]');
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.screenshot({path: './img/quote_search_result_overview.png'}); // This is the overview tab
    // need to show the plan design tab
    await page.click('li[class=item]');

    await setTimeout(
        ()=> {page.screenshot({path: './img/quote_search_result_plandesign.png'});},1000
    )
    
    // get all the href on the left nav bar -> then go to each link == Note this is only the first level navigation 
    var sel = ".menu1";
    const leftNavBarhref = await page.evaluate((sel) => {
        let elements = Array.from(document.querySelectorAll(sel));
        let links = elements.map(element => {
            return element.href
        })
        return links;
    }, sel);

    for(var i=0; i<leftNavBarhref.length; i++) {
        
        if(leftNavBarhref[i] != '') {
            let urlLength = await leftNavBarhref[i].split("/").length;
            console.log(leftNavBarhref[i].split("/")[urlLength-1].split(".")[0]); //the 6 is wrong should not be fixed
            await page.goto(leftNavBarhref[i], {
                             waitUntil: 'domcontentloaded'
            });
            let imgPath = './img/'+'quote_'+quoteId+'_'+leftNavBarhref[i].split("/")[6].split(".")[0]+'.png';
            await page.screenshot({path: imgPath});
        }
    }

    var end = await new Date().getTime();
    
    await console.log('This round of test uses: ' + (end-start) / 1000 + "seconds");
    
    await browser.close();

})();