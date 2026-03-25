import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaClipboardCheck,
  FaSignOutAlt,
  FaCalendarAlt,
  FaProjectDiagram
} from "react-icons/fa";

function AdminLayout() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition
     ${isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
     }`;

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">

        {/* Logo */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">SPMS</h2>
          <p className="text-sm text-gray-500">HR Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">

          <NavLink to="/dashboard" className={linkClass}>
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink to="/employees" className={linkClass}>
            <FaUsers />
            Employees
          </NavLink>

          <NavLink to="/departments" className={linkClass}>
            <FaBuilding />
            Departments
          </NavLink>

          <NavLink to="/attendance" className={linkClass}>
            <FaClipboardCheck />
            Attendance
          </NavLink>

          <NavLink to="/leaves" className={linkClass}>
            <FaCalendarAlt />
            Leaves
          </NavLink>

          <NavLink to="/projects" className={linkClass}>
            <FaProjectDiagram />
            Projects
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="p-4 border-t">

          <button
            onClick={logout}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-100 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="bg-white shadow rounded-lg p-4 mb-6 flex justify-between items-center">

          <h1 className="text-xl font-semibold">
            Software Personnel Management System
          </h1>

          <span className="text-sm text-gray-500">
            Admin Panel
          </span>

        </div>

        <Outlet />

      </div>

    </div>

  );
}

export default AdminLayout;