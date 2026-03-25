import { useEffect, useState } from "react";
import API from "../../api/axios";
import { FaTrash, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

function Departments() {

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {

      const deptRes = await API.get("/departments");
      const empRes = await API.get("/employees");

      setDepartments(deptRes.data);
      setEmployees(empRes.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addDepartment = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const exists = departments.some(
      (dep) => dep.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert("Department already exists");
      return;
    }

    try {

      const res = await API.post("/departments", { name });

      setDepartments([...departments, res.data]);
      setName("");

    } catch (error) {
      console.error(error);
    }
  };

  const deleteDepartment = async (id) => {

    const empCount = employees.filter(
      (emp) => emp.department?._id === id
    ).length;

    if (empCount > 0) {
      alert("Cannot delete department with employees");
      return;
    }

    if (!window.confirm("Delete this department?")) return;

    try {

      await API.delete(`/departments/${id}`);

      setDepartments(
        departments.filter(dep => dep._id !== id)
      );

    } catch (error) {
      console.error(error);
    }
  };

  const filteredDepartments = departments.filter((dep) =>
    dep.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-gray-500">
            Manage company departments
          </p>
        </div>

        <Link
          to="/dashboard"
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Dashboard
        </Link>

      </div>

      {/* Add Department */}

      <form
        onSubmit={addDepartment}
        className="flex gap-3 mb-6"
      >

        <input
          type="text"
          placeholder="Department name..."
          className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>

      </form>

      {/* Search */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search department..."
          className="border border-gray-300 p-2 rounded-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Department Cards */}

      {filteredDepartments.length === 0 ? (

        <p className="text-gray-500 text-center">
          No departments found
        </p>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {filteredDepartments.map((dep) => {

            const empCount = employees.filter(
              (emp) => emp.department?._id === dep._id
            ).length;

            return (

              <div
                key={dep._id}
                className="bg-white shadow rounded-lg p-5 flex justify-between items-center hover:shadow-lg transition"
              >

                <div className="flex items-center gap-3">

                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
                    <FaBuilding />
                  </div>

                  <div>

                    <h3 className="font-semibold text-lg">
                      {dep.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {empCount} Employees
                    </p>

                  </div>

                </div>

                <FaTrash
                  className="text-red-600 cursor-pointer hover:text-red-800"
                  onClick={() => deleteDepartment(dep._id)}
                />

              </div>

            );

          })}

        </div>

      )}

    </div>

  );
}

export default Departments;