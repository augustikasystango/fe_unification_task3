
"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TrafficSourcesChart() {
  const data = [
    { name: "Direct", value: 21.24 },
    { name: "Referral", value: 20.13 },
    { name: "Others", value: 19.95 },
    { name: "Social", value: 19.34 },
    { name: "Email", value: 19.34 },
  ];

  const COLORS = ["#d35400", "#e67e22", "#f1c40f", "#f39c12", "#c0392b"];

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full">
      <h2 className="text-lg font-semibold mb-4">
        Top 5 Traffic Sources by Session
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="middle" align="right" layout="vertical" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
