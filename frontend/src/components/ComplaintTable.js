import React from "react";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700"
};

const ComplaintTable = ({ complaints, onStatusChange, showStudent = false }) => {
  if (!complaints.length) {
    return <p className="text-gray-500">No complaints found.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="text-left px-4 py-3">Category</th>
            <th className="text-left px-4 py-3">Description</th>
            <th className="text-left px-4 py-3">Priority</th>
            <th className="text-left px-4 py-3">Status</th>
            {showStudent && <th className="text-left px-4 py-3">Student</th>}
            {onStatusChange && <th className="text-left px-4 py-3">Action</th>}
          </tr>
        </thead>
        <tbody>
          {complaints.map((item) => (
            <tr key={item._id} className="border-t border-gray-100">
              <td className="px-4 py-3">{item.category}</td>
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3">{item.priority}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${statusColor[item.status]}`}>
                  {item.status}
                </span>
              </td>
              {showStudent && (
                <td className="px-4 py-3">
                  {item.student?.name} ({item.student?.email})
                </td>
              )}
              {onStatusChange && (
                <td className="px-4 py-3">
                  <select
                    className="border border-gray-300 rounded px-2 py-1"
                    value={item.status}
                    onChange={(e) => onStatusChange(item._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;

