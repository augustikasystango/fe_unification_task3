export default function UsersPage() {
  const users = [
    { id: 1, name: "Alice Johnson", role: "Pilot" },
    { id: 2, name: "Bob Smith", role: "Co-Pilot" },
    { id: 3, name: "Charlie Davis", role: "Flight Attendant" },
  ];

  return (
     <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Users</h2>
      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="p-3 border rounded hover:bg-gray-50">
            <div className="font-medium">{u.name}</div>
            <div className="text-sm text-gray-500">{u.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
