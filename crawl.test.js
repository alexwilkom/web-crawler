const { normalizeURL, getURLsFromHTML } = require("./crawl");

describe("normalize url", () => {
  test("should remove protocol", () => {
    const input = "https://bendingsoons.com/path";
    const actual = normalizeURL(input);
    const expected = "bendingsoons.com/path";
    expect(actual).toEqual(expected);
  });

  test("should remove trailing slash", () => {
    const input = "https://bendingsoons.com/path/";
    const actual = normalizeURL(input);
    const expected = "bendingsoons.com/path";
    expect(actual).toEqual(expected);
  });
});

describe("getURLsFromHTML", () => {
  const baseURL = "https://www.bendingsoons.com";
  const inputBody = `
    <body>
      <h1>Backend</h1>
      <a href="https://apple.com">apple</a>
      <a href="https://www.starwars.com/">stars</a>
      <a href="/path/one/two/">google</a>
      <a href="path/one/two/">google</a>
    </body>
  `;

  test("absolute, relative and invalid paths", () => {
    const actual = getURLsFromHTML(inputBody, baseURL);
    const expected = [
      "https://apple.com/",
      "https://www.starwars.com/",
      "https://www.bendingsoons.com/path/one/two/",
    ];
    expect(actual).toEqual(expected);
  });
});
