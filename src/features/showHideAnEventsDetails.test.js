// Import necessary functions and components for testing
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { render, waitFor, within } from "@testing-library/react";

// Load the feature file for testing
const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

// Define the feature and its tests
defineFeature(feature, (test) => {
  // Test for checking default collapsed view of events
  test("Default Collapsed Event View", ({ given, when, then }) => {
    let AppComponent;

    // Setup for initial app opening
    given("the user first opens the app", () => {
      AppComponent = render(<App />); // Render the App component
    });

    // Confirming the presentation of the event list
    when("the list of events is presented", async () => {
      const AppDOM = AppComponent.container.firstChild; // Access the app's DOM
      const EventListDOM = AppDOM.querySelector("#event-list"); // Find the event list element

      // Wait for and verify the default number of events
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    // Check that all events are collapsed initially
    then("all events are collapsed by default", () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector("#details");
      expect(details).not.toBeInTheDocument(); // Details should not be visible initially
    });
  });

  // Test for expanding event details
  test("Expand Event Details", ({ given, when, then }) => {
    let AppComponent;

    // Setup for when the user is viewing the event list
    given("the user views the list of events", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild; // Access the app's DOM
      const EventListDOM = AppDOM.querySelector("#event-list"); // Find the event list element

      // Confirm the initial number of events
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    // Simulate user action to expand an event's details
    when("the user selects an event to see its details", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const button = AppDOM.querySelector(".details-btn"); // Find the button to show details
      const user = userEvent.setup(); // Setup user event simulation

      await user.click(button); // Simulate clicking the button
    });

    // Verify that the details of the event are shown
    then("the app expands to show the details of that event", () => {
      const AppDOM = AppComponent.container.firstChild;
      const details = AppDOM.querySelector("#details"); // Find the details section
      expect(details).toBeInTheDocument(); // Details should be visible now
    });
  });

  // Test for collapsing event details
  test("Collapse Event Details", ({ given, when, then }) => {
    let AppComponent;

    // Setup for when event details are already displayed
    given("the event details are displayed", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      // Confirm the initial state with event details displayed
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });

      // Expand an event's details
      const button = AppDOM.querySelector(".details-btn");
      await userEvent.click(button); // Simulate clicking the button

      const details = AppDOM.querySelector("#details");
      expect(details).toBeInTheDocument(); // Details should be visible
    });

    // Simulate user action to hide the event details
    when("the user chooses to hide these details", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const button = AppDOM.querySelector(".details-btn");
      const user = userEvent.setup();
      await user.click(button); // Simulate clicking the button again
    });

    // Verify that the details of the event are hidden
    then("the app collapses the event details", () => {
      const AppDOM = AppComponent.container.firstChild;
      const details = AppDOM.querySelector("#details"); // Find the details section
      expect(details).not.toBeInTheDocument(); // Details should be hidden now
    });
  });
});
