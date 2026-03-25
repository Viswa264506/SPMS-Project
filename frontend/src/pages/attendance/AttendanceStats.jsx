import { useEffect, useState } from "react";
import API from "../../api/axios";

function AttendanceStats() {

  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    late: 0,
    checkedOut: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    const res = await API.get("/attendance");

    const records = res.data;

    const present = records.filter(r => r.status === "Present").length;

    setStats({
      total: records.length,
      present,
      late: 0,
      checkedOut: records.filter(r => r.checkOut).length
    });

  };

  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      <div className="bg-white p-5 rounded-xl shadow">
        <p>Total Employees</p>
        <h2 className="text-2xl font-bold">{stats.total}</h2>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p>Present Today</p>
        <h2 className="text-2xl font-bold">{stats.present}</h2>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p>Late Arrivals</p>
        <h2 className="text-2xl font-bold">{stats.late}</h2>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p>Checked Out</p>
        <h2 className="text-2xl font-bold">{stats.checkedOut}</h2>
      </div>

    </div>

  );
}

export default AttendanceStats;