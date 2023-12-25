import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Cell } from "recharts";

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
  const colors = ["#1A535C", "#4ECDC4", "#6fa8dc", "#FF6B6B", "#FFE66D"];

  useEffect(() => {
    setData(getData());
  }, [`${events}`]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  // Declares the getData function using arrow function syntax
  const getData = () => {
    // Maps over the 'genres' array to transform each genre into an object
    const data = genres.map((genre) => {
      // Filters the 'events' array to count events where the summary includes the current genre
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      ).length;
      // Returns an object for each genre with its name and the count of related events
      return { name: genre, value: filteredEvents };
    });

    // Returns the transformed array of objects, each representing a genre and its event count
    return data;
  };

  // 'getData'  called to get the array of genres with their associated event counts

  // Renders the chart using the 'data' array returned by 'getData'
  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Legend verticalAlign="middle" align="right" layout="vertical" />
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          label={renderCustomizedLabel}
          labelLine={false}
          outerRadius={130}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
