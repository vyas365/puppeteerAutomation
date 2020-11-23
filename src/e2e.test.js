const {
  companyNamesList,
  fetchAllSymbols,
  verifySymbolListIsSorted,
  verifyAllRecords,
} = require("./pages/directoryList.js");

const { isElementVisible, timeout, setup } = require("./pages/utils.js");

const directorySelectors = require("./selectors/directoryList");
const quoteSelectors = require("./selectors/quote");
const pagerSelectors = require("./selectors/pager");

describe("Automation FE Exercise NYSE", () => {
  let page;
  const url = "https://www.nyse.com/listings_directory/stock";

  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await setup(page, url);
    await page.waitFor(4000);
  }, timeout);

  it("should display data sorted by Symbol in ascending", async () => {
    const isSymbolArraySorted = await verifySymbolListIsSorted(
      page,
      directorySelectors.symbolRow
    );
    expect(isSymbolArraySorted).toBe(true);
  });
  it("Directory must display Symbol and Name for the corresponding company", async () => {
    const actualCompanyNames = await companyNamesList(
      page,
      directorySelectors.name
    );
    const symbolsList = await fetchAllSymbols(
      page,
      directorySelectors.symbol,
      quoteSelectors.quoteSymbol
    );
    expect(symbolsList).toEqual(actualCompanyNames);
  });

  it("Directory must display 10 records per page and provide a pager", async () => {
    const recordsData = await verifyAllRecords(
      page,
      directorySelectors.records
    );
    expect(recordsData.length).toBe(10);
    const isPagerAvailable = await isElementVisible(
      page,
      directorySelectors.pager
    );
    expect(isPagerAvailable).toBe(true);
  });

  
  it("Directory pager must allow user to navigate to next page, previous page, first page, and last page", async () => {
    //navigate to next page
    await page.waitFor(pagerSelectors.next);
    await page.click(pagerSelectors.next);
    const isPageDisabled = await isElementVisible(page, pagerSelectors.pageDisabled);
    expect(isPageDisabled).toBe(true);

    //previous page
    await page.waitFor(pagerSelectors.previous);
    await page.click(pagerSelectors.previous);
    expect(isPageDisabled).toBe(true);

    //first page

    await page.waitFor(pagerSelectors.previous);
    await page.click(pagerSelectors.next);
    await page.waitFor(3000);
    await page.click(pagerSelectors.first);
    expect(isPageDisabled).toBe(true);

    //last page
    await page.waitFor(pagerSelectors.last);
    await page.waitFor(3000);
    await page.click(pagerSelectors.last);
    const lastPageVerification = await isElementVisible(
      page,
      pagerSelectors.next
    ); //next button should be disabled
    expect(lastPageVerification).toBe(false);
  });

  afterAll(async () => {
    await page.close();
  });
});
