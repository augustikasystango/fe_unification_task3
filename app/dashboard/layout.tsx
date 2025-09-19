import AnalyticsPage  from "./@analytics/page";
import ReportsPage from "./@reports/page";
import UsersPage from "./@users/page";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  users:React.ReactNode;
  Reports:React.ReactNode;
  analytics:React.ReactNode;
}>) {
  return (
   
      <div>
      <main className="mt-16 flex-1 p-6 overflow-y-auto">
            {/* If you want to render nested routes or extra stuff */}
            <div className="mb-6">{children}</div>

            {/* Grid for parallel routes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-lg p-4">
                <AnalyticsPage />
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <ReportsPage />
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <UsersPage />
              </div>
            </div>
          </main>
          </div>

  );
}