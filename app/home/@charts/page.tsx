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

  const COLORS = ["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd", "#1d4ed8"];

  // Custom tooltip for better accessibility
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div 
          className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border"
          role="tooltip"
          aria-live="polite"
        >
          <p className="font-medium">{data.name}</p>
          <p className="text-gray-200">
            {data.value}% of total sessions
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend for better accessibility
  type LegendPayloadItem = {
    value: string;
    color: string;
  };

  const CustomLegend = ({ payload }: { payload: LegendPayloadItem[] }) => {
    return (
      <ul className="space-y-2 mt-4 sm:mt-0" role="list" aria-label="Chart legend">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.color }}
              aria-hidden="true"
            />
            <span className="text-gray-700">
              <span className="font-medium">{entry.value}</span>
              <span className="text-gray-500 ml-1">
                ({data.find(d => d.name === entry.value)?.value}%)
              </span>
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full">
      <h2 
        className="text-lg sm:text-xl font-semibold mb-4 text-gray-900"
        id="traffic-chart-heading"
      >
        Top 5 Traffic Sources by Session
      </h2>
      
      {/* Screen reader accessible table for chart data */}
      <div className="sr-only">
        <table>
          <caption>Traffic sources breakdown showing percentage of total sessions</caption>
          <thead>
            <tr>
              <th scope="col">Traffic Source</th>
              <th scope="col">Percentage of Sessions</th>
              <th scope="col">Rank</th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => b.value - a.value)
              .map((item, index) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.value}%</td>
                  <td>{index + 1}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Chart container */}
        <div 
          className="flex-grow"
          role="img" 
          aria-labelledby="traffic-chart-heading"
          aria-describedby="chart-description"
        >
          <div id="chart-description" className="sr-only">
            Pie chart showing traffic source distribution. Direct traffic leads with 21.24%, 
            followed by Referral at 20.13%, Others at 19.95%, Social at 19.34%, and Email at 19.34%.
          </div>
          
          <div className="h-48 sm:h-64 lg:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  aria-label="Traffic sources pie chart"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                      aria-label={`${entry.name}: ${entry.value}%`}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  content={(props) => <CustomLegend payload={props.payload as LegendPayloadItem[]} />}
                  verticalAlign="middle" 
                  align="right" 
                  layout="vertical"
                  wrapperStyle={{
                    paddingLeft: "20px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mobile legend - shown below chart on small screens */}
        <div className="lg:hidden">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Legend</h3>
          <CustomLegend payload={data.map((item, index) => ({ 
            value: item.name, 
            color: COLORS[index % COLORS.length] 
          }))} />
        </div>
      </div>

      {/* Summary statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600">Top Source</p>
            <p className="font-semibold text-gray-900">
              {data.reduce((prev, current) => prev.value > current.value ? prev : current).name} 
              ({data.reduce((prev, current) => prev.value > current.value ? prev : current).value}%)
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600">Most Balanced</p>
            <p className="font-semibold text-gray-900">
              Social & Email (19.34% each)
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600">Total Sources</p>
            <p className="font-semibold text-gray-900">
              {data.length} categories tracked
            </p>
          </div>
        </div>
      </div>

      {/* Key insights for screen readers */}
      <div className="sr-only" aria-live="polite">
        <p>
          Traffic analysis summary: Direct traffic is the leading source at 21.24%, 
          with fairly balanced distribution across all sources. 
          The difference between highest and lowest is only {(
            Math.max(...data.map(d => d.value)) - Math.min(...data.map(d => d.value))
          ).toFixed(1)} percentage points, indicating diverse traffic acquisition.
        </p>
      </div>
    </div>
  );
}