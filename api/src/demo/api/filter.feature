
Feature: Filter Directory by sorting entering Sybmol or Company name
 
Background:
     * configure driver = { type: 'chrome' }
     * def filterApi = 'https://www.nyse.com/api/quotes/filter'
     * def inputFilter = "[id='instrumentFilter']"
 
  
  Scenario: Filter by sorting part of a Symbol
      * def searchSymbol = "IBM"
      * def sampleFilter =
      """
      {
        "instrumentType": "EQUITY",
        "pageNumber": 1,
        "sortColumn": "NORMALIZED_TICKER", 
        "sortOrder": "ASC", 
        "maxResultsPerPage": 10,
        "filterToken": "IBM"
      }
      """
      Given driver 'https://www.nyse.com/listings_directory/stock'
      And waitUntil("document.readyState == 'complete'")
      And input(inputFilter, searchSymbol,200)
      And url filterApi
      And request sampleFilter
      When method post
      Then status 200
      Then response[0].total == 1

  Scenario: Filter by sorting part of a Company Name and verify pager is disabled when records are below 10
      * def searchSymbol = "MSF"
      * def isPagerDisabled = "[class='pagination']>li[class='disabled']"
      * def partSearch =
      """
      {
        "instrumentType": "EQUITY",
        "pageNumber": 1,
        "sortColumn": "NORMALIZED_TICKER", 
        "sortOrder": "ASC", 
        "maxResultsPerPage": 10,
        "filterToken": "MSF"
      }
      """
      Given driver 'https://www.nyse.com/listings_directory/stock'
      And waitUntil("document.readyState == 'complete'")
      And input(inputFilter, searchSymbol, 300)
      And url filterApi
      And request partSearch
      When method post
      Then status 200
      And waitForResultCount(isPagerDisabled, 5) 
      Then response[0].total == 2
      
  
  Scenario: Display error message when no matches are found 
      * def searchSymbol = "AAXL"
      * def selector = "tbody>tr>td"
      * def noMatchesSearch =
      """
      {
        "instrumentType": "EQUITY",
        "pageNumber": 1,
        "sortColumn": "NORMALIZED_TICKER", 
        "sortOrder": "ASC", 
        "maxResultsPerPage": 10,
        "filterToken": "AAXL"
      }
      """
      Given driver 'https://www.nyse.com/listings_directory/stock'
      And waitUntil("document.readyState == 'complete'")
      And input(inputFilter, searchSymbol, 500)
      And url filterApi
      And request noMatchesSearch
      When method post
      Then status 200
      And click(selector)
      And waitForResultCount(selector, 1)  
      And match script(selector, "function(e){ return e.innerHTML }")  == "Sorry, we couldn't find any instruments that match your criteria."
      
  
     
  
      



  