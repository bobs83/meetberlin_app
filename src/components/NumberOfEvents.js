const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setCurrentNOE(value);

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "Would you mind double-checking the number you've chosen?";
    } else {
      errorText = "";
      setCurrentNOE(value);
    }
    setErrorAlert(errorText);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events">Event Count: </label>
      <input
        type="text"
        placeholder="Number of events"
        defaultValue="32"
        className="number-input"
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
