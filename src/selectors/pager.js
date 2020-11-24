// Example index=1 will be "First" -> usage pagerPositions(1)
// index=2 will be "Previous" -> usage pagerPositions(2)
// index=9 will be "Last"
const pagerPosition = (index) => `[class='pagination']>li:nth-child(${index})`;

const initialLoadPageDisabled = [
  pagerPosition(1),
  pagerPosition(2),
  pagerPosition(3),
];
const lastPageDisabled = [pagerPosition(7), pagerPosition(8), pagerPosition(9)];

module.exports = {
  first: pagerPosition(1),
  previous: pagerPosition(2),
  next: "a[rel='next']>span",
  last: pagerPosition(9),
  verifyNextDisabled: pagerPosition(4),
  initialLoadPageDisabled,
  lastPageDisabled,
};
