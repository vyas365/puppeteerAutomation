module.exports = {
  symbolRow: "tbody>tr>td>a",
  name: "tbody >tr>td:nth-child(2)",
  symbol: index => `tbody>tr:nth-child(${index})>td>a`,
  records: "tbody>tr",
  pager: "[class='pagination']"
};
