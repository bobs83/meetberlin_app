import NumberOfEvents from "../components/NumberOfEvents";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Defines a test suite for the NumberOfEvents component
describe("<NumberOfEvents/> component", () => {
  let NumberOfEventsComponent;

  // Before each test, render the NumberOfEvents component with a mock setNumber function
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={() => {}} />
    );
  });

  // Test to check if the input field is present in the rendered component
  test("has input field", () => {
    // Query for the input field by its role and assert its presence in the document
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  // Test to verify if the default number in the input field is set to 32
  test("default number is 32", () => {
    // Query for the input field by its role and check its initial value
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input.value).toBe("32");
  });

  // Test to ensure that the input field updates correctly when the user types
  test("updates number of events when user types", async () => {
    // Query for the input field by its role and simulate user input by typing
    const input = NumberOfEventsComponent.queryByRole("textbox");
    await userEvent.type(input, "{backspace}{backspace}10");

    // Assert that the input field value has been updated to "10"
    expect(input).toHaveValue("10");
  });
});
