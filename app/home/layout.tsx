
import AnalyticsPage from "./@analytics/page";
import TrafficSourcesChart from "./@charts/page";
import ReportsPage from "./@reports/page";
import UsersPage from "./@users/page";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  users: React.ReactNode;
  Reports: React.ReactNode;
  analytics: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
    

      <main
        id="main-content"
        className="pt-4 pb-8 px-4 sm:px-6 lg:px-8 lg:ml-60 lg:pt-16 min-h-screen"
        role="main"
        aria-label="Dashboard main content"
      >
     

        {/* Dashboard grid container */}
        <div className="space-y-6 mt-4">
          {/* First row - Analytics and Reports */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section
              className="bg-white shadow-sm border rounded-lg overflow-hidden"
              aria-labelledby="analytics-heading"
            >
              <AnalyticsPage />
            </section>
            <section
              className="bg-white shadow-sm border rounded-lg overflow-hidden"
              aria-labelledby="reports-heading"
            >
              <ReportsPage />
            </section>
          </div>

          {/* Second row - Users and Traffic Sources */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <section
              className="bg-white shadow-sm border rounded-lg overflow-hidden"
              aria-labelledby="users-heading"
            >
              <UsersPage />
            </section>
            <section
              className="bg-white shadow-sm border rounded-lg overflow-hidden"
              aria-labelledby="traffic-heading"
            >
              <TrafficSourcesChart />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}