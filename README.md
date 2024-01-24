# Web Crawler

## Overview

This Web Crawler is a Node.js application designed to crawl websites starting from a given base URL. It navigates through the website, recursively visiting all linked pages within the same domain. The crawler counts the number of times each page is linked within the domain, providing insights into the website's structure and link distribution.

## Features

- **Domain-specific Crawling**: Limits crawling to the specified domain, avoiding external links.
- **Link Counting**: Tracks and counts the occurrences of each page link within the domain.
- **Content-Type Validation**: Ensures that only HTML pages are processed.
- **URL Normalization**: Standardizes URLs to prevent counting duplicates.

## Installation

To use this Web Crawler, you need Node.js installed on your system.

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Ensure you have the required dependencies by running:
```bash
npm install
```

## Usage

Run the crawler with a single command line argument, which is the base URL for crawling.
```bash
node index.js [BASE_URL]
```
Replace [BASE_URL] with the URL of the website you want to crawl.

## Dependencies

- jsdom: Used to parse HTML and extract links.


