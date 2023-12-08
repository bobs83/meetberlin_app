const NumberOfEvents = ({ setNumber }) => {
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
  };

  return (
    <div id="number-of-events">
      <input type="text" defaultValue="32" onChange={handleInputChanged} />
    </div>
  );
};

export default NumberOfEvents;
