Feature: Filter input must allow a user to enter a part of a Symbol or Company Name to filter the Directory.
Filtering must occur as soon as the end user stops typing into the input field. For example, if “IBM” is
entered into the filter the Directory must filter automatically to display 1 record since
“INTERNATIONAL BUS MACH CORP” would be the only match available. If there are no matches found
the Directory must display error message “Sorry, we couldn't find any instruments that match your
criteria”. Note, pager must be disabled when Directory displays less than 10 records
 
Background:
   * configure driver = { type: 'chrome' }
     * def sampleFilter =
      """
      {
        "instrumentType": "EQUITY",
        "pageNumber": 10,
        "sortColumn": "NORMALIZED_TICKER", 
        "sortOrder": "ASC", 
        "maxResultsPerPage": 10,
        "filterToken": "A"
      }
      """
     * def filterApi = 'https://www.nyse.com/api/quotes/filter'
     * def Symbol = "[class*='table-sort']:nth-child(1)"
     * def Name = "[class*='table-sort']:nth-child(2)"
  
  Scenario: Sort Symbol column by clicking and verifying total number of records from directory response

      Given driver 'https://www.nyse.com/listings_directory/stock'
      And waitUntil("document.readyState == 'complete'")
      And click(Symbol)

      And url filterApi
      And request sampleFilter
      When method post
      Then status 200
      And assert response[0].total == 6717
      And assert response[0].instrumentType == ['COMMON_STOCK']


  