import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { Users, Building2, Activity, Calendar } from "lucide-react";

function Dashboard() {

   const role = localStorage.getItem("role") || "employee";
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      
      const role = localStorage.getItem("role");

let empRes;

if (role === "employee") {
  empRes = await API.get("/employees/me"); // 👈 own data
} else {
  empRes = await API.get("/employees"); // 👈 admin/hr
}

      const deptRes = await API.get("/departments");

      setEmployees(empRes.data);
      setDepartments(deptRes.data);

    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 NEW: Employee Status Counts
  const activeCount = employees.filter(e => e.status === "Active").length;
  const leaveCount = employees.filter(e => e.status === "On Leave").length;
  const inactiveCount = employees.filter(e => e.status === "Inactive").length;

  // Department Stats
  const departmentStats = departments.map((dept) => {
    const count = employees.filter(
      (emp) => emp.department && emp.department._id === dept._id
    ).length;

    return {
      name: dept.name,
      value: count || 0
    };
  });

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>

  {/* 🔥 ROLE BASED TITLE */}
  {role === "admin" && (
    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
  )}

  {role === "hr" && (
    <h1 className="text-2xl font-bold">HR Overview</h1>
  )}

  {role === "employee" && (
    <h1 className="text-2xl font-bold">My Dashboard</h1>
  )}

  <p className="text-sm text-gray-500 mt-1">
    Overview of your organization
  </p>

  <p className="text-sm text-gray-500">
    Welcome back 👋 Here's what's happening today
  </p>

</div>

      {/* 🔥 TODAY PANEL */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Today</p>
          <h2 className="text-lg font-semibold">
            {new Date().toDateString()}
          </h2>
        </div>
        <Calendar className="text-indigo-500" />
      </div>

      {/* 🔥 STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-indigo-600 text-white p-5 rounded-2xl">
          <Users />
          <p className="text-sm mt-2">Total</p>
          <h2 className="text-2xl font-semibold">{employees.length}</h2>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-2xl">
          <Activity />
          <p className="text-sm mt-2">Active</p>
          <h2 className="text-2xl font-semibold">{activeCount}</h2>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-2xl">
          <Users />
          <p className="text-sm mt-2">On Leave</p>
          <h2 className="text-2xl font-semibold">{leaveCount}</h2>
        </div>

        <div className="bg-red-500 text-white p-5 rounded-2xl">
          <Users />
          <p className="text-sm mt-2">Inactive</p>
          <h2 className="text-2xl font-semibold">{inactiveCount}</h2>
        </div>

      </div>

      {/* 🔥 QUICK ACTIONS */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

{(role === "admin" || role === "hr") && (
  <Link to={`/${role}/employees`}
    className="bg-white border rounded-2xl p-5 hover:shadow-md transition group">
    <h3 className="font-medium group-hover:text-indigo-600">
      Employees
    </h3>
    <p className="text-sm text-gray-500">
      Manage workforce
    </p>
  </Link>
  )}

  {role === "admin" && (

  <Link to={`/${role}/departments`}
    className="bg-white border rounded-2xl p-5 hover:shadow-md transition group">
    <h3 className="font-medium group-hover:text-indigo-600">
      Departments
    </h3>
    <p className="text-sm text-gray-500">
      Organize teams
    </p>
  </Link>
  )}

  <Link to={`/${role}/attendance`}
    className="bg-white border rounded-2xl p-5 hover:shadow-md transition group">
    <h3 className="font-medium group-hover:text-indigo-600">
      Attendance
    </h3>
    <p className="text-sm text-gray-500">
      Track records
    </p>
  </Link>

</div>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CHART */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold mb-4">
            Employees by Department
          </h2>

          <div style={{ width: "100%", height: 300 }}>
            {departmentStats.length === 0 ? (
              <p className="text-center text-gray-400">
                No data available
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentStats}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {departmentStats.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 🔥 RECENT EMPLOYEES */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold mb-4">
            Recent Employees
          </h2>

          {employees.slice(0, 5).map((emp) => (
            <div key={emp._id} className="flex items-center justify-between py-2 border-b">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
                  {emp.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{emp.name}</p>
                  <p className="text-xs text-gray-500">{emp.email}</p>
                </div>
              </div>

              <span className={`text-xs px-2 py-1 rounded-full
                ${emp.status === "Active" && "bg-green-100 text-green-600"}
                ${emp.status === "On Leave" && "bg-yellow-100 text-yellow-600"}
                ${emp.status === "Inactive" && "bg-red-100 text-red-600"}
              `}>
                {emp.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;