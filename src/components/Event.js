import { useState } from "react";
import { getEvents } from "../api";
import mockData from "../mock-data";

const Event = ({ event }) => {
  const [showDetails, setshowDetails] = useState(false);

  return (
    <li>
      <h3>{event.summary}</h3>
      <p>{event.created}</p>
      <p>{event.location}</p>

      <button
        onClick={() => {
          setshowDetails(!showDetails);
        }}
      >
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails ? (
        <div id="details">
          <p>
            When: {event.start.dateTime}
            <span>({event.start.timeZone})</span>
          </p>
          <p>{event.description}</p>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
