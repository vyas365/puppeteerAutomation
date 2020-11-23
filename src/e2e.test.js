const timeout = 10000;

describe("Automation FE Exercise NYSE", () => {
  let page;
  beforeEach(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto("https://www.nyse.com/listings_directory/stock");
    await page.setViewport({ width: 0, height: 0 });
    await page.evaluate(() => {
      window.scrollBy(0, window.document.body.scrollHeight);
    });
    await page.waitFor(4000);
  }, timeout);

  it("should display data sorted by Symbol in ascending", async () => {
    let tickerSymbols = [];
    await page.waitForSelector("tbody>tr>td>a");
    let elements = await page.$$("tbody>tr>td>a");
    for (let element of elements) {
      let tickerSymbol = await page.evaluate((el) => el.innerHTML, element);
      tickerSymbols.push(tickerSymbol);
    }
    const isSymbolArraySorted = !![tickerSymbols].reduce(
      (n, item) => n !== false && item >= n && item
    );
    expect(isSymbolArraySorted).toBe(true);
  });
  it("Directory must display Symbol and Name for the corresponding company", async () => {
    await page.waitForSelector("tbody>tr");
    let actualCompanyNames = [];
    await page.waitForSelector("tbody >tr>td:nth-child(2)");
    let names = await page.$$("tbody >tr>td:nth-child(2)");
    for (let name of names) {
      let companyName = await page.evaluate((el) => el.innerHTML, name);
      companyName = companyName.replace(/&amp;/g, "&");
      actualCompanyNames.push(companyName);
    }

    let symbol = (index) => `tbody>tr:nth-child(${index})>td>a`;
    let symbolsList = [];
    for (let i = 1; i <= 10; i++) {
      await page.waitForSelector(symbol(i), { visible: true });
      await page.click(symbol(i));
      await page.waitFor(3000);
      await page.waitForSelector("[class='d-dquote-symbol']>span:nth-child(1)");
      let element = await page.$("[class='d-dquote-symbol']>span:nth-child(1)");
      let symbolName = await page.evaluate(
        (element) => element.textContent,
        element
      );
      symbolName = symbolName.trim();
      symbolsList.push(symbolName);
      await page.goBack();
    }
    expect(symbolsList).toEqual(actualCompanyNames);
  });

  it("Directory must display 10 records per page and provide a pager", async () => {
    await page.waitFor("tbody>tr");
    const elements = await page.$$("tbody>tr");
    await page.waitFor("tbody>tr");
    let recordsData = [];
    for (let element of elements) {
      await page.waitForSelector("tbody>tr");
      // await page.waitFor(4000);
      let record = await page.evaluate((element) => element.innerHTML, element);
      await page.waitFor(4000);
      recordsData.push(record);
    }
    expect(recordsData.length).toBe(10);
    const isPagerAvailable = await isElementVisible(
      page,
      "[class='pagination']"
    );
    expect(isPagerAvailable).toBe(true);
  });

  const isElementVisible = async (page, cssSelector) => {
    let visible = true;
    await page
      .waitForSelector(cssSelector, { visible: true, timeout: timeout })
      .catch(() => {
        visible = false;
      });
    return visible;
  };

  it("Directory pager must allow user to navigate to next page, previous page, first page, and last page", async () => {
    //navigate to next page
    await page.waitFor("a[rel='next']>span");
    await page.click("a[rel='next']>span");
    const isPageDisabled = await isElementVisible(page, '[class="disabled"]>a');
    expect(isPageDisabled).toBe(true);

    //previous page
    await page.waitFor("[class='pagination']>li:nth-child(2)");
    await page.click("[class='pagination']>li:nth-child(2)");
    expect(isPageDisabled).toBe(true);

    //first page

    await page.waitFor("[class='pagination']>li:nth-child(2)");
    await page.click("[class='pagination']>li:nth-child(4)");
    await page.waitFor(3000);
    await page.click("[class='pagination']>li:nth-child(1)");
    expect(isPageDisabled).toBe(true);

    //last page
    await page.waitFor("[class='pagination']>li:nth-child(9)");
    await page.waitFor(3000);
    await page.click("[class='pagination']>li:nth-child(9)");
    const lastPageVerification = await isElementVisible(
      page,
      "a[rel='next']>span"
    ); //next button should be disabled
    expect(lastPageVerification).toBe(false);
  });

  afterAll(async () => {
    await page.close();
  });
});
