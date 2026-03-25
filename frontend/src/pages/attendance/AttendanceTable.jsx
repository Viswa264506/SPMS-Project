import { useEffect, useState } from "react";
import API from "../../api/axios";

function AttendanceTable() {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {

      const res = await API.get("/attendance");
      setRecords(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Attendance Records
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border rounded-lg overflow-hidden">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border p-2">Employee</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Check In</th>
              <th className="border p-2">Check Out</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>

            {records.map((item) => (

              <tr key={item._id} className="hover:bg-gray-50">

                <td className="border p-2">
  {item.employee ? item.employee.name : "Unknown"}
</td>

                <td className="border p-2">
                  {new Date(item.date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric"
})}
                </td>

                <td className="border p-2">
{
new Date(item.checkIn).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})
}
</td>

                <td className="border p-2">
{
new Date(item.checkOut).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})
}
</td>

                <td className="border p-2">
  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
    {item.status}
  </span>
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AttendanceTable;