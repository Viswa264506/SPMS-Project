import { useEffect, useState } from "react";
import API from "../../api/axios";

function AttendanceForm() {

  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckIn = async () => {
  try {

    await API.post("/attendance/checkin", {
      employeeId
    });

    alert("Check-in successful");

  } catch (error) {
    console.error(error);
  }
};

const handleCheckOut = async () => {
  try {

    await API.post("/attendance/checkout", {
      employeeId
    });

    alert("Check-out successful");

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Daily Check-in / Check-out
      </h2>

      <div className="flex flex-col md:flex-row gap-4">

        <select
          className="border p-2 rounded flex-1"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >

          <option value="">Select Employee</option>

          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}

        </select>

        <button
onClick={handleCheckIn}
className="bg-green-500 text-white px-4 py-2 rounded"
>
Mark Check-In
</button>

        <button
onClick={handleCheckOut}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Mark Check-Out
</button>

      </div>

    </div>
  );
}

export default AttendanceForm;