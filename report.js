function printReport(pages) {
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const count = sortedPage[1];
    console.log(`Found ${count} internal links to ${url}`);
  }
}

function sortPages(pages) {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((pageA, pageB) => pageB[1] - pageA[1]);
  return pagesArray;
}

module.exports = {
  printReport,
  sortPages,
};
