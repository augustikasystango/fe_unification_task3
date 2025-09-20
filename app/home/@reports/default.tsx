export default function ReportsPage() {
  const reports = [
    { id: 1, title: "Monthly Report", status: "Completed" },
    { id: 2, title: "Quarterly Report", status: "In Progress" },
    { id: 3, title: "Annual Report", status: "Pending" },
  ];

  return (
   <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Reports</h2>
      <ul className="space-y-2">
        {reports.map((r) => (
          <li key={r.id} className="p-3 border rounded hover:bg-gray-50">
            <div className="font-medium">{r.title}</div>
            <div className="text-sm text-gray-500">{r.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
