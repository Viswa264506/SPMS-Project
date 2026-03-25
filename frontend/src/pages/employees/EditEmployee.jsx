import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";

function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
    department: "",
    status: "Active"
  });

  // 🔥 FETCH EMPLOYEE
  const fetchEmployee = async () => {
    try {
      const res = await API.get(`/employees/${id}`);

      setFormData({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        position: res.data.position,
        salary: res.data.salary,
        department: res.data.department?._id || "",
        status: res.data.status || "Active"
      });

    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 FETCH DEPARTMENTS
  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/employees/${id}`, formData);
      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10 px-4">

      <div className="w-full max-w-3xl space-y-6">

        {/* 🔥 HEADER */}
        <div>
          <h1>Edit Employee</h1>
          <p className="text-gray-500 mt-1">
            Update employee information
          </p>
        </div>

        {/* 🔥 FORM CARD */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 🔥 GRID FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* NAME */}
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              {/* PHONE */}
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              {/* POSITION */}
              <div>
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              {/* SALARY */}
              <div>
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                />
              </div>

              {/* DEPARTMENT */}
              <div>
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🔥 STATUS (NEW) */}
              <div>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

            </div>

            {/* 🔥 ACTION BUTTONS */}
            <div className="flex justify-end gap-3 pt-4 border-t">

              <button
                type="button"
                onClick={() => navigate("/employees")}
                className="px-4 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
              >
                Update Employee
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditEmployee;