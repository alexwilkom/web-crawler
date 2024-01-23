const {crawlPage} = require('./crawl')

async function init() {
  const args = process.argv.slice(2);
  if (args.length === 1) {
    const baseURL = args[0];
    console.log(`Starting crawling at ${baseURL}...`)
    await crawlPage(baseURL);
  } else {
    console.error("Please, provide a URL to crawl.");
  }
}

init();
