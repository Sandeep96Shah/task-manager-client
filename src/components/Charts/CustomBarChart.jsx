import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({data}) => {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#8051FF";
      case "Medium":
        return "#00BB0B";
      case "High":
        return "#7BCE00";
      default:
        return "#00FE76";
    }
  };
  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey={"priority"}
            tick={{ fontSize: 12, fill: "#555" }}
            cursor={{ fill: "transparent" }}
          />
          <Tooltip />
          <Bar
            dataKey={"count"}
            nameKey="priority"
            fill="#FF8042"
            activeDot={{ r: 8, fill: "yellow" }}
            redius={[10, 10, 0, 0]}
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
          <Tooltip />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
