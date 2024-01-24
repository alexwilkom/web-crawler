const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function init() {
  const args = process.argv.slice(2);
  const baseURL = args[0];

  if (args.length === 1) {
    console.log(`Starting crawling at ${baseURL}...`);
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
  } else {
    console.log("Please, provide a URL to crawl.");
  }
  
}

init();
