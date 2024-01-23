const { JSDOM } = require("jsdom");

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
};
