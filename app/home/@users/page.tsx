
export default function UsersPage() {
  const trafficSources = [
    { source: "google", sessions: 6860, change: "-6%" },
    { source: "(direct)", sessions: 4768, change: "-6%" },
    { source: "neilpatel.com", sessions: 406, change: "-11%" },
    { source: "bytraject.com", sessions: 271, change: "+158%" },
    { source: "bing", sessions: 152, change: "+9%" },
  ];

  // Generate consistent random data for chart bars
  const chartData = Array.from({ length: 20 }, (_, idx) => ({
    id: idx,
    height: Math.floor(Math.random() * 80) + 20, // 20-100% height
    value: Math.floor(Math.random() * 50) + 10 // Random value for accessibility
  }));

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full">
      {/* Section 1: Website Traffic Sources */}
      <section aria-labelledby="traffic-heading">
        <h2 
          className="text-lg sm:text-xl font-semibold mb-4 text-gray-900"
          id="traffic-heading"
        >
          Website Traffic Sources
        </h2>
        
        {/* Mobile-friendly table wrapper */}
        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <div className="inline-block min-w-full px-2 sm:px-0">
            <table 
              className="w-full text-sm min-w-[320px]"
              role="table"
              aria-labelledby="traffic-heading"
            >
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th 
                    className="pb-2 pr-4 font-semibold text-gray-900"
                    scope="col"
                    id="source-header"
                  >
                    Source
                  </th>
                  <th 
                    className="pb-2 pr-4 font-semibold text-gray-900 text-right"
                    scope="col"
                    id="sessions-header"
                  >
                    Sessions
                  </th>
                  <th 
                    className="pb-2 font-semibold text-gray-900 text-right"
                    scope="col"
                    id="change-header"
                  >
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {trafficSources.map((item, idx) => {
                  const isPositive = item.change.startsWith("+");
                  const changeColor = isPositive ? "text-green-600" : "text-red-600";
                  const changeAriaLabel = `${isPositive ? "Increase" : "Decrease"} of ${item.change.substring(1)}`;
                  
                  return (
                    <tr 
                      key={idx} 
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td 
                        className="py-3 pr-4 font-medium text-gray-900"
                        headers="source-header"
                      >
                        {item.source}
                      </td>
                      <td 
                        className="py-3 pr-4 text-right tabular-nums"
                        headers="sessions-header"
                      >
                        <span aria-label={`${item.sessions.toLocaleString()} sessions`}>
                          {item.sessions.toLocaleString()}
                        </span>
                      </td>
                      <td 
                        className={`py-3 text-right font-medium tabular-nums ${changeColor}`}
                        headers="change-header"
                        aria-label={changeAriaLabel}
                      >
                        <span aria-hidden="true">{item.change}</span>
                        <span className="sr-only">{changeAriaLabel}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary for screen readers */}
        <div className="sr-only" aria-live="polite">
          Traffic sources summary: Google leads with {trafficSources[0].sessions.toLocaleString()} sessions, 
          followed by direct traffic with {trafficSources[1].sessions.toLocaleString()} sessions. 
          {trafficSources.filter(item => item.change.startsWith("+")).length} sources showing growth, 
          {trafficSources.filter(item => item.change.startsWith("-")).length} sources showing decline.
        </div>
      </section>

      {/* Section 2: Website Conversions */}
      <section className="mt-6 sm:mt-8" aria-labelledby="conversions-heading">
        <h2 
          className="text-lg sm:text-xl font-semibold mb-2 text-gray-900"
          id="conversions-heading"
        >
          Website Conversions
        </h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              318{" "}
              <span 
                className="text-green-600 text-sm sm:text-base font-medium"
                aria-label="4% increase"
              >
                +4%
              </span>
            </p>
            <p className="text-gray-500 text-sm">Conversions</p>
          </div>
        </div>

        {/* Accessible chart representation */}
        <div 
          className="mt-4"
          role="img"
          aria-labelledby="conversions-heading"
          aria-describedby="chart-description"
        >
          <div id="chart-description" className="sr-only">
            Bar chart showing conversion trends over recent periods. 
            Values range from {Math.min(...chartData.map(d => d.value))} to {Math.max(...chartData.map(d => d.value))} conversions per period.
            Average conversions per period: {Math.round(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length)}.
          </div>

          {/* Visual chart */}
          <div className="h-16 sm:h-24 flex items-end gap-1 bg-gray-50 p-2 rounded-lg">
            {chartData.map((bar) => (
              <div
                key={bar.id}
                className="bg-green-400 hover:bg-green-500 transition-colors duration-200 w-2 sm:w-3 rounded-t-sm"
                style={{ height: `${bar.height}%` }}
                role="presentation"
                aria-hidden="true"
                title={`Period ${bar.id + 1}: ${bar.value} conversions`}
              />
            ))}
          </div>
        </div>

        {/* Data table for screen readers */}
        <div className="sr-only">
          <table>
            <caption>Conversion data over recent periods</caption>
            <thead>
              <tr>
                <th scope="col">Period</th>
                <th scope="col">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((bar) => (
                <tr key={bar.id}>
                  <td>Period {bar.id + 1}</td>
                  <td>{bar.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chart summary */}
        <div className="mt-3 text-xs sm:text-sm text-gray-500">
          <p>
            Trend chart showing recent conversion activity. 
            Current period shows strong performance with 4% growth.
          </p>
        </div>
      </section>
    </div>
  );
}