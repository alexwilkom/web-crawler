const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  try {
    const response = await fetch(currentURL);
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && !contentType.includes("text/html")) {
        console.error(`Error: content type is not text/html`);
      } else if (contentType && contentType.includes("text/html")) {
        console.log(`Crawling...`);
        console.log(await response.text());
      }
    } else {
      console.error(`Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function normalizeURL(url) {
  try {
    const urlObj = new URL(url);
    let fullPath = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
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
