import { render, within, waitFor } from "@testing-library/react";
import { getEvents } from "../api";
import EventList from "../components/EventList";
import App from "../App";

// Defines a test suite for the EventList component
describe("<EventList /> component", () => {
  let EventListComponent;

  // Before each test, render the EventList component
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  // Test to check if an element with the "list" role is present in the rendered component
  test('has an element with "list" role', () => {
    // Query for an element with the "list" role and assert its presence in the document
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  // Test to check if the component renders the correct number of events
  test("renders correct number of events", async () => {
    // Fetch all events using the API (assuming it's an asynchronous operation)
    const allEvents = await getEvents();

    // Re-render the EventList component with the fetched events
    EventListComponent.rerender(<EventList events={allEvents} />);

    // Query for all elements with the "listitem" role and check their count against the fetched events length
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(
      allEvents.length
    );
  });
});

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    });
  });
});

// describe("<EventList /> component", () => {
//   test('has an element with "list" role', () => {
//     const EventListComponent = render(<EventList />);
//     expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
//   });
// });

// test("renders correct number of events", () => {
//   const EventListComponent = render(
//     <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
//   );
//   expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
// });
