import { useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

function Leaves() {

  const [leaves, setLeaves] = useState([
    { id: 1, name: "John Doe", reason: "Medical", status: "Pending" },
    { id: 2, name: "Jane Smith", reason: "Vacation", status: "Pending" }
  ]);

  const updateStatus = (id, status) => {
    const updated = leaves.map(leave =>
      leave.id === id ? { ...leave, status } : leave
    );
    setLeaves(updated);
  };

  const getStatusStyle = (status) => {
    if (status === "Approved")
      return "bg-green-100 text-green-700";
    if (status === "Rejected")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Leave Management
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Requests</p>
          <h2 className="text-xl font-bold">{leaves.length}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-xl font-bold text-yellow-600">
            {leaves.filter(l => l.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Approved</p>
          <h2 className="text-xl font-bold text-green-600">
            {leaves.filter(l => l.status === "Approved").length}
          </h2>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {leaves.map(leave => (
              <tr
                key={leave.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {leave.name}
                </td>

                <td className="p-4 text-gray-600">
                  {leave.reason}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusStyle(leave.status)}`}
                  >
                    {leave.status}
                  </span>
                </td>

                <td className="p-4 text-center space-x-2">

                  {leave.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(leave.id, "Approved")}
                        className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(leave.id, "Rejected")}
                        className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </>
                  )}

                  {leave.status !== "Pending" && (
                    <span className="text-gray-400 text-sm italic">
                      Action Completed
                    </span>
                  )}

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Leaves;