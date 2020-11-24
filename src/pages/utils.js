const timeout = 10000;

const isElementVisible = async (page, element) => {
  let visible = true;
  await page
    .waitForSelector(element, { visible: true, timeout: timeout })
    .catch(() => {
      visible = false;
    });
  return visible;
};

const areElementsVisible = async (page, elements) => {
  let visible = true;
  for (let element of elements) {
    await page
      .waitForSelector(element, { visible: true, timeout: timeout })
      .catch(() => {
        visible = false;
      });
  }
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
  areElementsVisible,
  setup,
  timeout,
};
