import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

function Employees() {

  const role = localStorage.getItem("role"); // 🔥 role

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ================= FETCH ================= */
  const fetchEmployees = async () => {
    try {
      let res;

      if (role === "employee") {
        res = await API.get("/employees/me"); // 👈 own data
      } else {
        res = await API.get("/employees"); // 👈 admin/hr
      }

      setEmployees(res.data);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await API.delete(`/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= FILTER ================= */
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || emp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-green-100 text-green-700";
    if (status === "On Leave") return "bg-yellow-100 text-yellow-700";
    if (status === "Inactive") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-6 space-y-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-xl font-semibold">Employees</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your workforce efficiently
          </p>
        </div>

        {/* 🔥 ADD BUTTON (ADMIN ONLY) */}
        {role === "admin" && (
          <Link
            to={`/${role}/employees/add`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            + Add Employee
          </Link>
        )}

      </div>

      {/* 🔥 SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <input
          type="text"
          placeholder="Search employees..."
          className="w-full md:w-80 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">

          {["All", "Active", "On Leave", "Inactive"].map((status) => (

            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition
              ${statusFilter === status
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {status}
            </button>

          ))}

        </div>

      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {loading ? (
          <div className="p-6 text-center text-gray-400">
            Loading employees...
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No employees found
          </div>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Employee</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredEmployees.map((emp) => (

                  <tr
                    key={emp._id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* EMPLOYEE */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                          {emp.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">
                            {emp.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {emp.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* DEPARTMENT */}
                    <td className="p-4 text-gray-600">
                      {emp.department?.name || "N/A"}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(emp.status)}`}>
                        {emp.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex justify-end gap-2">

                        {/* VIEW */}
                        <button
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition"
                        >
                          <FaEye />
                        </button>

                        {/* EDIT (ADMIN + HR) */}
                        {(role === "admin" || role === "hr") && (
                          <Link
                            to={`/${role}/employees/edit/${emp._id}`}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-yellow-600 transition"
                          >
                            <FaEdit />
                          </Link>
                        )}

                        {/* DELETE (ADMIN ONLY) */}
                        {role === "admin" && (
                          <button
                            onClick={() => deleteEmployee(emp._id)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-red-600 transition"
                          >
                            <FaTrash />
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* 🔥 MODAL */}
      {showModal && selectedEmployee && (

        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >

          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex flex-col items-center">

              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-semibold">
                {selectedEmployee.name.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-3 font-semibold">
                {selectedEmployee.name}
              </h2>

              <p className="text-sm text-gray-500">
                {selectedEmployee.email}
              </p>

            </div>

            <div className="mt-5 space-y-2 text-sm text-gray-600">

              <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
              <p><strong>Department:</strong> {selectedEmployee.department?.name}</p>
              <p><strong>Position:</strong> {selectedEmployee.position}</p>
              <p><strong>Salary:</strong> ₹{selectedEmployee.salary}</p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Employees;