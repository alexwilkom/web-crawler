const { normalizeURL, getURLsFromHTML } = require("./crawl");

describe("normalize url", () => {
  test("should remove protocol", () => {
    const input = "https://bendingspoons.com/path";
    const actual = normalizeURL(input);
    const expected = "bendingspoons.com/path";
    expect(actual).toEqual(expected);
  });

  test("should remove trailing slash", () => {
    const input = "https://bendingspoons.com/path";
    const actual = normalizeURL(input);
    const expected = "bendingspoons.com/path";
    expect(actual).toEqual(expected);
  });
});

describe("getURLsFromHTML", () => {
  const baseURL = "https://www.bendingspoons.com";
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
      "https://www.bendingspoons.com/path/one/two/",
    ];
    expect(actual).toEqual(expected);
  });
});
