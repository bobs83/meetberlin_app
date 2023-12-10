import Event from "../components/Event";
import { render } from "@testing-library/react";
import mockData from "../mock-data";
import userEvent from "@testing-library/user-event";

// Extract a mock event from the mock data for testing
const mockEvent = mockData[0];

// Defines a test suite for the Event component
describe("<Event /> Component", () => {
  let EventComponent;

  // Before each test, render the Event component with the mock event
  beforeEach(() => {
    EventComponent = render(<Event event={mockEvent} />);
  });

  // Test to check if the event's title is present in the rendered component
  test("has the event's title", () => {
    // Query for the event's title text and assert its presence in the document
    const title = EventComponent.queryByText(mockEvent.summary);
    expect(title).toBeInTheDocument();
  });

  // Test to check if the event's time is present in the rendered component
  test("has the event's time", () => {
    // Query for the event's time text and assert its presence in the document
    const time = EventComponent.queryByText(mockEvent.created);
    expect(time).toBeInTheDocument();
  });

  // Test to check if the event's location is present in the rendered component
  test("has the event's location", () => {
    // Query for the event's location text and assert its presence in the document
    const location = EventComponent.queryByText(mockEvent.location);
    expect(location).toBeInTheDocument();
  });

  // Test to check if the "Show Details" button is present in the rendered component
  test("has a button to show details", () => {
    // Query for the "Show Details" button text and assert its presence in the document
    const button = EventComponent.queryByText("Show Details");
    expect(button).toBeInTheDocument();
  });

  // Test to check if details are displayed when the "Show Details" button is clicked
  // Solved with help from chat GPT

  test('show details after user clicks button "Show Details"', async () => {
    // Setup userEvent, find the "Show Details" button, and simulate a click
    const user = userEvent.setup();
    const button = EventComponent.queryByText("Show Details");
    await user.click(button);

    // Query for the details element and assert its presence in the document
    const details = EventComponent.container.querySelector("#details");
    expect(details).toBeInTheDocument();
  });

  // Test to check if details are hidden when the "Show Details" button is clicked again
  // Solved with help from chat GPT

  test("hides details when button is clicked again", async () => {
    // Setup userEvent, find the "Show Details" button, and simulate clicks to show and then hide details
    const user = userEvent.setup();
    const button = EventComponent.queryByText("Show Details");

    // First click to show details
    await user.click(button);
    let details = EventComponent.container.querySelector("#details");
    expect(details).toBeInTheDocument();
    expect(button.textContent).toBe("Hide Details");

    // Second click to hide details
    await user.click(button);

    details = EventComponent.container.querySelector("#details");
    expect(details).toBeNull();
    expect(button.textContent).toBe("Show Details");
  });
});
