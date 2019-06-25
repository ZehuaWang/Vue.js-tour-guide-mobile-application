var createQuote = require("./createQuote");
var generateProposal = require("./generateProposalByQuote");

// Quote 1628 can not generate proposal -> why
var quoteArr = [1807,1620];
(async() =>{
    await quoteArr.forEach((quote) =>{ generateProposal(quote)});
})();