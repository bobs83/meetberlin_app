import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer
      .launch
      // { headless: false, slowMo: 250, timeout: 0} to see the test in real time
      ();

    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event-box");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".eventbox #details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event-box .details-btn");
    const eventDetails = await page.$(".event-box .details-btn");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".event-box .details-btn");
    const eventDetails = await page.$(".event-box #details");
    expect(eventDetails).toBeNull();
  });
});
