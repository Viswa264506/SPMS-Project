import AttendanceForm from "./AttendanceForm";
import AttendanceTable from "./AttendanceTable";
import AttendanceStats from "./AttendanceStats";

function Attendance() {
  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold text-gray-800">
        Attendance Management
      </h1>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <AttendanceForm />
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">
            Admin-only control zone
          </h2>

          <p className="text-sm text-gray-200">
            Use this panel to record employee presence once per day and avoid duplicate punch-ins.
            Table filters are available below to quickly inspect daily activity.
          </p>
        </div>

      </div>

      {/* Stats */}
      <AttendanceStats />

      {/* Table */}
      <AttendanceTable />

    </div>
  );
}

export default Attendance;