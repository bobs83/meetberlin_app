import { render, within } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents, extractLocations } from "../api";

// Defines a test suite for the CitySearch component
describe("<CitySearch /> component", () => {
  let CitySearchComponent;

  // Before each test, render the CitySearch component and assign it to CitySearchComponent
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });

  // Test to ensure the city text input box is rendered
  test("renders text input", () => {
    // Find the textbox element and check if it's in the document and has the class 'city'
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  // Test to check if the suggestions list is hidden by default
  test("suggestions list is hidden by default", () => {
    // Query for a list element and assert that it's not in the document
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  // Test if the list of suggestions renders when the city textbox gains focus
  test("renders a list of suggestions when city textbox gains focus", async () => {
    // Simulate a user clicking on the city textbox
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.click(cityTextBox);

    // Check if the suggestions list appears and has the correct class
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  // Test to verify if the suggestions list updates correctly as the user types in the city textbox
  test("updates list of suggestions correctly when user types in city textbox", async () => {
    // Setup userEvent, get events and locations, and rerender the component with locations
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    // Simulate typing "Berlin" in the city textbox
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // Filter locations that match "Berlin" and assert the length and content of the suggestions list
    const suggestions = allLocations
      ? allLocations.filter(
          (location) =>
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
        )
      : [];
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  // Test to ensure the city textbox shows the clicked suggestion text
  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    // Setup userEvent, get events and locations, and rerender the component with locations
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
    );

    // Simulate typing "Berlin" and clicking the first suggestion
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");
    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];
    await user.click(BerlinGermanySuggestion);

    // Assert that the city textbox's value matches the clicked suggestion
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

// Integration test suite for the CitySearch component within the App context
describe("<CitySearch /> integration", () => {
  // Test to ensure that the CitySearch suggestions list renders within the App
  test("renders suggestions list when the app is rendered.", async () => {
    // Initialize user event library for simulating user interactions
    const user = userEvent.setup();

    // Render the main App component, which includes the CitySearch component
    const AppComponent = render(<App />);

    // Retrieve the DOM element of the App component for further querying
    const AppDOM = AppComponent.container.firstChild;

    // Locate the CitySearch component inside the App's DOM using a specific ID
    const CitySearchDOM = AppDOM.querySelector("#city-search");

    // Find the city input textbox within the CitySearch component and simulate a user click to focus on it
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
    await user.click(cityTextBox);

    // Fetch events and extract location data for testing the functionality
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    // Query for all list items (suggestions) within the CitySearch component and evaluate if they're rendered correctly
    const suggestionListItems =
      within(CitySearchDOM).queryAllByRole("listitem");

    // Assert that the number of suggestions rendered matches the number of locations extracted, plus one (typically for an 'All Cities' option)
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});
