import * as http from 'http';
import * as puppeteer from 'puppeteer';

export default async () => {
  const server = http
    .createServer((req, res) => {
      console.log('totototoot');
      console.log(req, res);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('salut');
      res.end();
    })
    .listen(9090);

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('http://localhost:9090');

  return server;
};
