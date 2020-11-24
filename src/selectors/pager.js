// This function is used to store the selectors of the pages that are disabled
// Example index = 1 will be "First" -> usage pagerPositionDisabled(1)
// index = 2 will be "Previous" -> usage pagerPositionDisabled(2)
// index = 9 will be "Last"

const pagerPositionDisabled = (index) =>
  `[class='pagination']>li[class='disabled']:nth-child(${index})`;

const initialLoadPageDisabled = [
  pagerPositionDisabled(1),
  pagerPositionDisabled(2),
  pagerPositionDisabled(3),
];
const lastPageDisabled = [
  pagerPositionDisabled(7),
  pagerPositionDisabled(8),
  pagerPositionDisabled(9),
];

const pagerPosition = (index) => `[class='pagination']>li:nth-child(${index})`;

module.exports = {
  first: pagerPosition(1),
  previous: pagerPosition(2),
  next: "a[rel='next']>span",
  last: pagerPosition(9),
  verifyNextDisabled: pagerPosition(4),
  initialLoadPageDisabled,
  lastPageDisabled,
};
