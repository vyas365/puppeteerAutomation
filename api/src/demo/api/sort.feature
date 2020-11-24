Feature: Allow users to sort Symbol and Name column.

 
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
        "filterToken": ""
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


  Scenario: Sort Name column by clicking and verifying total number of records from directory response
  
    Given driver 'https://www.nyse.com/listings_directory/stock'
    And waitUntil("document.readyState == 'complete'")
    And click(Name)

    And url filterApi
    And request sampleFilter
    When method post
    Then status 200
    And assert response[0].total == 6717
    And assert response[0].instrumentType == ['COMMON_STOCK']

  Scenario: Symbol must provide a link to the quote page (e.g. https://www.nyse.com/quote/XNYS:A for Symbol A).

    * def filterSymbolUrl =
      """
      {
        "instrumentType": "EQUITY",
        "pageNumber": 1,
        "sortColumn": "NORMALIZED_TICKER", 
        "sortOrder": "ASC", 
        "maxResultsPerPage": 10,
        "filterToken": "A"
      }
      """
    Given driver 'https://www.nyse.com/listings_directory/stock'
    And waitUntil("document.readyState == 'complete'")

    Then url filterApi
    And request filterSymbolUrl
    When method post
    Then status 200
    Then response[0].url == "https://www.nyse.com/quote/XNYS:A"
    Then response[0].total == 1

  

