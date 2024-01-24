const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const currentUrlObj = new URL(currentURL);
  const baseUrlObj = new URL(baseURL);
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  if (currentURL === baseURL) {
    // don't count the base URL as a link to itself
    pages[normalizedURL] = 0;
  } else {
    pages[normalizedURL] = 1;
  }

  let htmlBody = "";
  try {
    const response = await fetch(currentURL);
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType.includes("text/html")) {
        htmlBody = await response.text();
      } else {
        console.log(`Error: content type is not text/html`);
        return pages;
      }
    } else {
      console.log(`Error: ${response.status}`);
      return pages;
    }
  } catch (error) {
    console.log(error.message);
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

function normalizeURL(url) {
  try {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.length > 0 && fullPath[-1] === "/") {
      fullPath = fullPath.slice(0, -1);
    }
    return fullPath;
  } catch (e) {
    console.log(`${err.message}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const anchors = new JSDOM(htmlBody).window.document.querySelectorAll("a");
  for (const anchor of anchors) {
    if (anchor.href[0] === "/") {
      try {
        const url = new URL(anchor.href, baseURL).href;
        urls.push(url);
      } catch (err) {
        console.log(`${err.message}: ${anchor.href}`);
      }
    } else {
      try {
        const url = new URL(anchor.href).href;
        urls.push(url);
      } catch (err) {
        console.log(`${err.message}: ${anchor.href}`);
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
