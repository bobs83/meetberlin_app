import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setshowDetails] = useState(false);

  // Function to format the date and time
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString(
      [],
      options
    )}`;
  };

  return (
    <li className="event-box">
      <h2>{event.summary}</h2>
      <p>{event.location}</p>
      <p>{event.created}</p>
      <p>When: {formatDate(event.start.dateTime)}</p>
      <span>Timezone: ({event.start.timeZone})</span>
      <button
        className="details-btn"
        onClick={() => setshowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails ? (
        <div id="details">
          <p>{event.description}</p>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
