import puppeteer from "puppeteer";

// Describe a test suite for showing and hiding event details
describe("show/hide an event details", () => {
  let browser;
  let page;

  // Before all tests, set up a browser and a new page
  beforeAll(async () => {
    browser = await puppeteer
      .launch // { headless: false, slowMo: 250, timeout: 0} to see the test in real time
      (); // Launch a headless browser for testing
    page = await browser.newPage(); // Open a new page in the browser
    await page.goto("http://localhost:3000/"); // Navigate to the app's URL
  });

  // Before each test, reload the page to reset its state
  beforeEach(async () => {
    await page.reload(); // Ensure each test starts with a fresh page
  });

  // After all tests, close the browser
  afterAll(() => {
    browser.close(); // Clean up by closing the browser
  });

  // Test to verify that event details are collapsed by default
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".eventbox #details"); // Query the page for event details
    expect(eventDetails).toBeNull(); // Expect the details to not be present initially
  });

  // Test to check if a user can expand an event to see its details
  test("User can expand an event to see its details", async () => {
    await page.click(".event-box .details-btn"); // Simulate a click on the details button
    const eventDetails = await page.$(".event-box .details-btn"); // Query for event details again
    expect(eventDetails).toBeDefined(); // Expect the details to be present after expanding
  });

  // Test to verify that a user can collapse an event to hide its details
  test("User can collapse an event to hide details", async () => {
    await page.click(".event-box .details-btn"); // First, expand the details
    await page.click(".event-box .details-btn"); // Then, collapse them
    const eventDetails = await page.$(".event-box #details"); // Check if details are hidden
    expect(eventDetails).toBeNull(); // Expect the details to be hidden again
  });
});
