const companyNamesList = async (page, selectorToWaitFor) => {
  await page.waitForSelector(selectorToWaitFor);
  let actualCompanyNames = [];
  await page.waitForSelector(selectorToWaitFor);
  let names = await page.$$(selectorToWaitFor);
  for (let name of names) {
    let companyName = await page.evaluate((el) => el.innerHTML, name);
    companyName = companyName.replace(/&amp;/g, "&");
    actualCompanyNames.push(companyName);
  }
  return actualCompanyNames;
};

const fetchAllSymbols = async (page, selectorToClick, selectorToWaitFor) => {
  let symbolsList = [];
  for (let i = 1; i <= 10; i++) {
    await page.waitForSelector(selectorToClick(i), { visible: true });
    await page.click(selectorToClick(i));
    await page.waitFor(3000);
    await page.waitForSelector(selectorToWaitFor);
    let element = await page.$(selectorToWaitFor);
    let symbolName = await page.evaluate(
      (element) => element.textContent,
      element
    );
    symbolName = symbolName.trim();
    symbolsList.push(symbolName);
    await page.goBack();
  }
  return symbolsList;
};

const verifySymbolListIsSorted = async (page, selectorToWaitFor) => {
  let tickerSymbols = [];
  await page.waitForSelector(selectorToWaitFor);
  let elements = await page.$$(selectorToWaitFor);
  for (let element of elements) {
    let tickerSymbol = await page.evaluate((el) => el.innerHTML, element);
    tickerSymbols.push(tickerSymbol);
  }
  const isSymbolListSorted = !![tickerSymbols].reduce(
    (n, item) => n !== false && item >= n && item
  );
  return isSymbolListSorted;
};
const verifyAllRecords = async (page, selectorToWaitFor) => {
  await page.waitFor(selectorToWaitFor);
  const elements = await page.$$(selectorToWaitFor);
  await page.waitFor(selectorToWaitFor);
  let recordsData = [];
  for (let element of elements) {
    await page.waitForSelector(selectorToWaitFor);
    // await page.waitFor(4000);
    let record = await page.evaluate((element) => element.innerHTML, element);
    await page.waitFor(4000);
    recordsData.push(record);
  }
  return recordsData;
};

module.exports = {
  companyNamesList,
  fetchAllSymbols,
  verifySymbolListIsSorted,
  verifyAllRecords,
};
