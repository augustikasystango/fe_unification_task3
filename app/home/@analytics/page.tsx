"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", flights: 40 },
  { day: "Tue", flights: 30 },
  { day: "Wed", flights: 60 },
  { day: "Thu", flights: 50 },
  { day: "Fri", flights: 80 },
];

// Custom tooltip component for better accessibility
import type { TooltipProps } from "recharts";

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    const day = payload[0]?.payload?.day;
    return (
      <div 
        className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border"
        role="tooltip"
        aria-live="polite"
      >
        <p className="font-medium">{`Day: ${day}`}</p>
        <p className="text-blue-200">
          {`Flights: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full">
      <h2 
        className="text-lg sm:text-xl font-semibold mb-4 text-gray-900"
        id="analytics-heading"
      >
        Flight Analytics
      </h2>
      
      {/* Screen reader accessible table for chart data */}
      <div className="sr-only">
        <table>
          <caption>Weekly flight data showing number of flights per day</caption>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Number of Flights</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.day}>
                <td>{item.day}</td>
                <td>{item.flights}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div 
        className="w-full"
        role="img" 
        aria-labelledby="analytics-heading"
        aria-describedby="chart-description"
      >
        <div id="chart-description" className="sr-only">
          Line chart showing flight data over weekdays. Monday: 40 flights, Tuesday: 30 flights, Wednesday: 60 flights, Thursday: 50 flights, Friday: 80 flights.
        </div>
        
        <ResponsiveContainer 
          width="100%" 
          height={250}
          className="min-h-[200px] sm:min-h-[250px]"
        >
          <LineChart 
            data={data}
            margin={{ 
              top: 20, 
              right: 20, 
              left: 20, 
              bottom: 20 
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#ddd" 
              aria-hidden="true"
            />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              axisLine={{ stroke: '#666' }}
              aria-label="Days of the week"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              axisLine={{ stroke: '#666' }}
              aria-label="Number of flights"
              label={{ 
                value: 'Flights', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#4f46e5', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Line 
              type="monotone" 
              dataKey="flights" 
              stroke="#4f46e5" 
              strokeWidth={2}
              dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
              activeDot={{ 
                r: 6, 
                fill: '#4f46e5',
                stroke: '#fff',
                strokeWidth: 2
              }}
              aria-label="Flight data trend line"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary text for additional context */}
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Peak flights occurred on Friday (80), with the lowest on Tuesday (30). 
          Average flights per day: {Math.round(data.reduce((sum, item) => sum + item.flights, 0) / data.length)}.
        </p>
      </div>
    </div>
  );
}