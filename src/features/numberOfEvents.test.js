// Import necessary functions from jest-cucumber and testing-library/react
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App"; // Import the App component to test
import userEvent from "@testing-library/user-event"; // Import for simulating user events

// Load the feature file for testing
const feature = loadFeature("./src/features/numberOfEvents.feature");

// Define the feature and its tests
defineFeature(feature, (test) => {
  // Test for the default number of events shown
  test("Default Event Count", ({ given, when, then }) => {
    let AppComponent;

    // Setup for when the user hasn't changed the event count
    given("the user hasn't specified a number of events", () => {
      AppComponent = render(<App />); // Render the App component
    });

    // Checking the number of events displayed by default
    when("the user views the event list", async () => {
      const AppDOM = AppComponent.container.firstChild; // Get the first child of the component's container
      const EventListDOM = AppDOM.querySelector("#event-list"); // Find the event list element

      // Wait for the event list to update and check its length
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32); // Expect 32 items by default
      });
    });

    // Confirming that the default event count is 32
    then("the app displays 32 events by default", async () => {
      // Similar steps as the 'when' clause to confirm the result
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  // Test for customizing the number of events shown
  test("Customize Event Count", ({ given, when, then }) => {
    let AppComponent;

    // Setup for when the event list is already displayed
    given("the event list is displayed", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      // Check the initial number of events
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    // Simulate the user changing the number of events to display
    when(
      "the user selects a different number of events to be displayed",
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const input = AppDOM.querySelector(".number-input"); // Find the input for changing the event count
        const user = userEvent.setup(); // Setup user event simulation

        // Simulate user typing a new number
        await user.type(input, "{backspace}{backspace}10");
      }
    );

    // Verify that the app updates the event list based on the user's selection
    then(
      "the app updates the list to show the selected number of events",
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const eventList = within(AppDOM).queryAllByRole("listitem");
        expect(eventList.length).toEqual(10); // Expect 10 items after the update
      }
    );
  });
});
