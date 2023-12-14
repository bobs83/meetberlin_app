Feature: Show/Hide Event Details
  Scenario: Default Collapsed Event View
    Given the user first opens the app
    When the list of events is presented
    Then all events are collapsed by default

  Scenario: Expand Event Details
    Given the user views the list of events
    When the user selects an event to see its details
    Then the app expands to show the details of that event

  Scenario: Collapse Event Details
    Given the event details are displayed
    When the user chooses to hide these details
    Then the app collapses the event details
