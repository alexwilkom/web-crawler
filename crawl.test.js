const normalizeURL = require("./crawl");

describe("normalize url", () => {
  let expected;

  beforeAll(() => {
    expected = "blog.boot.dev/path";
  });

  test("should remove protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
  });

  test("should remove trailing slash", () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    expect(actual).toEqual(expected);
  });
});
