const fs = require('fs');
const puppeteer = require('puppeteer');
const PropertiesReader = require('properties-reader');

const actionStack = require('./actionStack'); // This is a class used to execute the action and print the error log
const as = new actionStack();
const properties = PropertiesReader('./config/config.properties');
const addQuoteproperties = PropertiesReader('./config/quoteAdd.properties');

//Get all the parameters from config file
const homeUrl    = properties.get('homeUrl') ;
const userName   = properties.get('userName');
const passWord   = properties.get('passWord');
const clientName = addQuoteproperties.get('clientName');
const productFamily = addQuoteproperties.get('productFamily');
const allProductsSelected = addQuoteproperties.get('allProduct');

module.exports = (async() => {
    
    // set the CSS id related to the related product
    const productMap = new Map();
    productMap.set("lifeFamily","lifeFamily_group");
    productMap.set("disabilityFamily","disabilityFamily_group");
    productMap.set("Medical","medicalFamily_group");
    productMap.set("Dental","productSetupFormList13.selected");
    productMap.set("accidentCoverage","productSetupFormList15.selected");
    productMap.set("criticalIllness","productSetupFormList16.selected");
    productMap.set("Vision","productSetupFormList17.selected");

    await console.log("Running quote creation...");
    var start = await new Date().getTime();
    
    // Initialize browser and page object
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    // Set the view port big enough to view the full page
    await page.setViewport({ 
        width: 1920,
        height: 1768
    });
    
    // excute the login procedure -> should read from the properties file
    await excuteActionAndCaputerException(page, () => page.goto(homeUrl));
    await page.type('input[name=loginName]', userName);
    await page.type('input[name=passwd]',passWord);
    
    await page.screenshot({path: './img/login_page.png'});

    // go to the first page and take a screen shoot
    //page.click('button[type=submit]');

    excuteActionAndCaputerException(page,() => {page.click('button[type=submit]');});
    
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.screenshot({path: './img/home_page.png'});

    // go to the quote tab on the top nav bar
    var topNavBarSel = 'ul.nav.navbar-top-links.navbar-left > li > a';
    const topNavBarSelLink = await page.evaluate((topNavBarSel) => {
        let elements = Array.from(document.querySelectorAll(topNavBarSel));
        let links = elements.map(element => {
            return element.href
        });
        return links;
    }, topNavBarSel);

    // debug
    console.log('The top bar nav link is: '+topNavBarSelLink);

    // go to the quote search page
    await excuteActionAndCaputerException(page, ()=> {page.goto(topNavBarSelLink[2],{waitUntil: 'domcontentloaded'});})


    await page.screenshot({path: './img/quote_search_page.png'});

    // get the left nav bar link
    var leftNavBarSel = 'ul.nav.side-menu > li > a';
    const leftNavBarSelLink = await page.evaluate((leftNavBarSel) => {
        let elements = Array.from(document.querySelectorAll(leftNavBarSel));
        let links = elements.map(element => {
            return element.href;
        });
        return links;
    }, leftNavBarSel);

    //debug
    console.log('The left bar nav link is: ' + leftNavBarSelLink);

    // go to client lookup page -> this is where to add quote
    await excuteActionAndCaputerException(page, ()=>{page.goto(leftNavBarSelLink[1],{waitUntil: 'domcontentloaded'});});
    await page.screenshot({path: './img/add_quote_page.png'});

    // on the Add quote page -> 1. input the client legal name 2. click search
    await page.type('input[name=clientName]', clientName);
    page.click("button[name='submit.search']");
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    await page.screenshot({path: './img/client_lookup_page.png'});

    // TODO If the client do not exist, throw error to a log file. Only the accurate clinetName can be use
    var clientNameSel = "table[id='clientSelectionTable'] > tbody > tr > td.sorting_1 > input";
    const type = await page.evaluate((clientNameSel) => {
        var radio = document.querySelector(clientNameSel);
        let type = radio.type;
        radio.click();
        return type;
    }, clientNameSel);

    // debug
    await page.screenshot({path: './img/client_lookup_page_select.png'});

    await excuteActionAndCaputerException(page, ()=>{page.click("button[name='submit.continue']");})

    await page.screenshot({path: './img/quote_setup_page.png'});

    // In quote setup page, you need to check the config you need -> this should come from the quoteAdd.properties config file
    // Examole -> choose basic Life as product and no quick features
    // selectAllProducts
    if(allProductsSelected+'' == 'true') {
        await page.evaluate(()=> {
            document.querySelector("input[id='selectAllProducts']").click();
        })
    } else { // select each individual product
        var productFamilyArr = await stringToArray(productFamily);
        await console.log("The product you choose is: " + productFamilyArr);       
        
        // TODO The select id can not reflect on the web page -> Dental,accidentCoverage,criticalIllness,Vision is not right
        await productFamilyArr.forEach((product) => {
            let inputId = productMap.get(product);
            let sel = "input[id=" + "'" + inputId + "'" + "]";
            
            page.evaluate((sel) => {
                document.querySelector(sel).click();
            }, sel);

        }); 
    }

    await page.screenshot({path: './img/quote_setup_page_after_select.png'});

    await excuteActionAndCaputerException(page,() => {page.click('button[type=submit]');});

    await page.screenshot({path: './img/quote_build.png'});

    await browser.close();

    var end = await new Date().getTime();

    await console.log("Total time used is: " + (end - start)/1000 + " s");
});

function stringToArray(str) {
    var productArr = [];
    productArr = str.split(",");
    return productArr;
}

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

// Add a function to write to log file -> TODO Add a format for the log
async function writeToLog(errMessage) {
    
    await fs.writeFileSync("./log/errorlog", errMessage, function(err){
        if(err) {return console.log(err);}
    })
    
    await console.log("The log is saved");
}