import React, { useEffect, useMemo, useState } from "react";
import ComplaintTable from "../components/ComplaintTable";
import { getAllComplaints, updateComplaintStatus } from "../api";

const categories = ["All", "Electrical", "Plumbing", "Cleaning", "Internet", "Furniture", "Other"];
const statuses = ["All", "Pending", "In Progress", "Resolved"];

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadComplaints = async () => {
    setLoading(true);
    setError("");
    try {
      const filters = {};
      if (category !== "All") filters.category = category;
      if (status !== "All") filters.status = status;
      const { data } = await getAllComplaints(filters);
      setComplaints(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [category, status]);

  const handleStatusChange = async (id, nextStatus) => {
    setError("");
    try {
      await updateComplaintStatus(id, nextStatus);
      setComplaints((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: nextStatus } : item))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update complaint status");
    }
  };

  const counts = useMemo(
    () => ({
      total: complaints.length,
      pending: complaints.filter((c) => c.status === "Pending").length,
      inProgress: complaints.filter((c) => c.status === "In Progress").length,
      resolved: complaints.filter((c) => c.status === "Resolved").length
    }),
    [complaints]
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>

        {error && <p className="bg-red-100 text-red-600 text-sm p-2 rounded">{error}</p>}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gray-50 border border-gray-200 rounded p-3">Total: {counts.total}</div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">Pending: {counts.pending}</div>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            In Progress: {counts.inProgress}
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-3">Resolved: {counts.resolved}</div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                Category: {item}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                Status: {item}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={loadComplaints}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">All Complaints</h3>
        <ComplaintTable complaints={complaints} onStatusChange={handleStatusChange} showStudent />
      </section>
    </div>
  );
};

export default AdminDashboard;
