const timeout = 10000;

const isElementVisible = async (page, cssSelector) => {
  let visible = true;
  await page
    .waitForSelector(cssSelector, { visible: true, timeout: timeout })
    .catch(() => {
      visible = false;
    });
  return visible;
};

const setup = async (page, url) => {
  await page.goto(url);
  await page.setViewport({ width: 0, height: 0 });
  await page.evaluate(() => {
    window.scrollBy(0, window.document.body.scrollHeight);
  });
};

module.exports = {
  isElementVisible,
  setup,
  timeout,
};
