import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });
});

// describe("<App /> component", () => {
//   test("renders list of events", () => {
//     const AppDOM = render(<App />).container.firstChild;
//     expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
//   });
// });

// test("render CitySearch", () => {
//   const AppDOM = render(<App />).container.firstChild;
//   expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
// });
