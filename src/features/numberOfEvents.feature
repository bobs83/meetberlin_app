Feature: Specify Number of Displayed Events
  Scenario: Default Event Count
    Given the user hasn't specified a number of events
    When the user views the event list
    Then the app displays 32 events by default

  Scenario: Customize Event Count
    Given the event list is displayed
    When the user selects a different number of events to be displayed
    Then the app updates the list to show the selected number of events
