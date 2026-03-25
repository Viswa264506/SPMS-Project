import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaProjectDiagram,
  FaBuilding,
  FaClipboardList,
  FaCalendarCheck,
  FaRegCalendarTimes
} from "react-icons/fa";

function DashboardLayout() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role") || "employee";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const navItem =
    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition";

  const active =
    "bg-indigo-600 text-white shadow-md";

  const inactive =
    "text-gray-300 hover:bg-gray-800 hover:text-white";

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">

        {/* LOGO */}
        <div className="px-6 py-5 border-b border-gray-800">
          <h1 className="text-xl font-bold">SPMS</h1>
          <p className="text-xs text-gray-400 mt-1">
            HR Management System
          </p>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-3 py-4 space-y-2">

          {/* DASHBOARD */}
          <NavLink
            to={`/${role}/dashboard`}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <FaClipboardList />
            Dashboard
          </NavLink>

          {/* EMPLOYEES (Admin + HR) */}
          {(role === "admin" || role === "hr") && (
            <NavLink
              to={`/${role}/employees`}
              className={({ isActive }) =>
                `${navItem} ${isActive ? active : inactive}`
              }
            >
              <FaUsers />
              Employees
            </NavLink>
          )}

          {/* DEPARTMENTS (Admin only) */}
          {role === "admin" && (
            <NavLink
              to={`/${role}/departments`}
              className={({ isActive }) =>
                `${navItem} ${isActive ? active : inactive}`
              }
            >
              <FaBuilding />
              Departments
            </NavLink>
          )}

          {/* ATTENDANCE */}
          <NavLink
            to={`/${role}/attendance`}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <FaCalendarCheck />
            Attendance
          </NavLink>

          {/* LEAVES */}
          <NavLink
            to={`/${role}/leaves`}
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            <FaRegCalendarTimes />
            Leaves
          </NavLink>

          {/* PROJECTS (Admin only) */}
          {role === "admin" && (
            <NavLink
              to={`/${role}/projects`}
              className={({ isActive }) =>
                `${navItem} ${isActive ? active : inactive}`
              }
            >
              <FaProjectDiagram />
              Projects
            </NavLink>
          )}

        </nav>

        {/* 🔥 FOOTER */}
        <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
          © 2026 SPMS
        </div>

      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 flex flex-col">

        {/* 🔥 TOPBAR */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Software Personnel Management System
            </h1>

            {/* 🔥 ROLE BADGE */}
            <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium">
              {role.toUpperCase()} PANEL
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

        {/* 🔥 CONTENT */}
        <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;