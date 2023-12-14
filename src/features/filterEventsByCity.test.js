// Import necessary functions and components for testing
import { render, waitFor, within } from "@testing-library/react";
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

// Load the feature file for testing
const feature = loadFeature("./src/features/filterEventsByCity.feature");

// Define the feature and its tests
defineFeature(feature, (test) => {
  // Test for displaying all events when no city is searched
  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t searched for any city", () => {
      // No setup required here as this is the default state of the app
    });

    let AppComponent;
    when("the user opens the app", () => {
      AppComponent = render(<App />); // Render the App component
    });

    then("user should see the list of all upcoming events.", async () => {
      const AppDOM = AppComponent.container.firstChild; // Access the app's DOM
      const EventListDOM = AppDOM.querySelector("#event-list"); // Find the event list element

      // Wait and check that the default event list is displayed
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32); // Expect 32 items by default
      });
    });
  });

  // Test for showing suggestions when searching for a city
  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the main page is open", () => {
      AppComponent = render(<App />); // Render the App component
    });

    let CitySearchDOM;
    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup(); // Setup user event simulation
      const AppDOM = AppComponent.container.firstChild; // Access the app's DOM
      CitySearchDOM = AppDOM.querySelector("#city-search"); // Find the city search element

      const citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin"); // Simulate typing "Berlin"
    });

    then(
      "the user should recieve a list of cities (suggestions) that match what they’ve typed",
      async () => {
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole("listitem"); // Query for the list of suggestions
        expect(suggestionListItems).toHaveLength(2); // Expect two suggestions for "Berlin"
      }
    );
  });

  // Test for selecting a city from the suggestions
  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    given("user was typing “Berlin” in the city textbox", async () => {
      AppComponent = render(<App />); // Render the App component
      const user = userEvent.setup(); // Setup user event simulation
      AppDOM = AppComponent.container.firstChild; // Access the app's DOM
      CitySearchDOM = AppDOM.querySelector("#city-search"); // Find the city search element
      citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin"); // Simulate typing "Berlin"
    });

    let suggestionListItems;
    and("the list of suggested cities is showing", () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2); // Verify that two suggestions are displayed
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      async () => {
        const user = userEvent.setup(); // Setup user event simulation
        await user.click(suggestionListItems[0]); // Simulate clicking the first suggestion
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(citySearchInput.value).toBe("Berlin, Germany"); // Verify the input value is updated
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const EventListDOM = AppDOM.querySelector("#event-list"); // Find the event list element
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        const allEvents = await getEvents(); // Fetch all events

        // Filter events to those in Berlin, Germany
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );
        expect(EventListItems).toHaveLength(berlinEvents.length); // Verify the number of events matches
      }
    );
  });
});
