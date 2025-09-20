export default function ReportsPage() {
  const reports = [
    { id: 1, title: "Monthly Report", status: "Completed" },
    { id: 2, title: "Quarterly Report", status: "In Progress" },
    { id: 3, title: "Annual Report", status: "Pending" },
  ];


  interface StatusInfo {
    color: string;
    ariaLabel: string;
    bgColor: string;
  }

  const getStatusInfo = (status: string): StatusInfo => {
    switch (status) {
      case "Completed":
        return { 
          color: "text-green-600", 
          ariaLabel: "Status: Completed",
          bgColor: "bg-green-50 border-green-200"
        };
      case "In Progress":
        return { 
          color: "text-blue-600", 
          ariaLabel: "Status: In Progress",
          bgColor: "bg-blue-50 border-blue-200"
        };
      case "Pending":
        return { 
          color: "text-orange-600", 
          ariaLabel: "Status: Pending",
          bgColor: "bg-orange-50 border-orange-200"
        };
      default:
        return { 
          color: "text-gray-600", 
          ariaLabel: `Status: ${status}`,
          bgColor: "bg-gray-50 border-gray-200"
        };
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 w-full">
      <h2 
        className="text-lg sm:text-xl font-semibold mb-4 text-gray-900"
        id="reports-heading"
      >
        Reports
      </h2>
      
      <ul 
        className="flex flex-col gap-3"
        role="list"
        aria-labelledby="reports-heading"
      >
        {reports.map((r) => {
          const statusInfo = getStatusInfo(r.status);
          return (
            <li 
              key={r.id} 
              className={`p-3 sm:p-4 border rounded-lg hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 transition-colors duration-200 ${statusInfo.bgColor}`}
              role="listitem"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="font-medium text-gray-900 text-sm sm:text-base">
                  {r.title}
                </div>
                <div 
                  className={`text-sm font-medium ${statusInfo.color}`}
                  aria-label={statusInfo.ariaLabel}
                >
                  <span className="sr-only">Report status: </span>
                  {r.status}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Summary information for screen readers */}
      <div className="sr-only" aria-live="polite">
        <p>
          Reports summary: {reports.length} total reports. 
          {reports.filter(r => r.status === "Completed").length} completed, 
          {reports.filter(r => r.status === "In Progress").length} in progress, 
          {reports.filter(r => r.status === "Pending").length} pending.
        </p>
      </div>

      {/* Visual summary for sighted users */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            {reports.filter(r => r.status === "Completed").length} Completed
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
            {reports.filter(r => r.status === "In Progress").length} In Progress
          </span>
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded"></div>
            {reports.filter(r => r.status === "Pending").length} Pending
          </span>
        </div>
      </div>
    </div>
  );
}