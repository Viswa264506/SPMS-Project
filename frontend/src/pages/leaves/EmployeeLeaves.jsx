import { useState } from "react";

function EmployeeLeaves() {

  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState([]);

  const applyLeave = (e) => {
    e.preventDefault();

    if (!reason) return;

    const newLeave = {
      id: Date.now(),
      reason,
      status: "Pending"
    };

    setLeaves([newLeave, ...leaves]);
    setReason("");
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Apply Leave
      </h1>

      {/* Apply Form */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <form onSubmit={applyLeave} className="flex gap-4">

          <input
            type="text"
            placeholder="Reason"
            className="flex-1 border p-2 rounded-lg"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Apply
          </button>

        </form>

      </div>

      {/* My Leaves */}
      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="font-semibold mb-4">My Leave Requests</h2>

        {leaves.length === 0 && (
          <p className="text-gray-400">No leave requests yet</p>
        )}

        {leaves.map((l) => (
          <div key={l.id} className="flex justify-between border-b py-2">
            <span>{l.reason}</span>
            <span className="text-yellow-600 font-medium">{l.status}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default EmployeeLeaves;