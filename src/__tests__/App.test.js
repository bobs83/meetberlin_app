import { render } from "@testing-library/react";
import App from "../App";

// Test suite for the <App /> component
describe("<App /> component", () => {
  let AppDOM;

  // Render App component before each test
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  // Test for rendering the list of events
  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  // Test for rendering the CitySearch component
  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  // Test for rendering the number of events component
  test("render number of events component", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});
