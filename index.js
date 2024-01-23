function main() {
  const args = process.argv.slice(2);
  if (args.length === 1) {
    console.log(`Starting crawling at ${args[0]}...`)
  } else {
    console.error("Please, provide a URL to crawl.");
  }
}

main();
