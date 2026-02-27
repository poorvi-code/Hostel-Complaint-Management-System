import React, { useEffect, useState } from "react";
import { getMyComplaints, submitComplaint } from "../api";
import ComplaintTable from "../components/ComplaintTable";

const categories = ["Electrical", "Plumbing", "Cleaning", "Internet", "Furniture", "Other"];
const priorities = ["Low", "Medium", "High"];

const StudentDashboard = () => {
  const [formData, setFormData] = useState({
    category: "Electrical",
    description: "",
    priority: "Medium"
  });
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadComplaints = async () => {
    try {
      const { data } = await getMyComplaints();
      setComplaints(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load complaints");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await submitComplaint(formData);
      setFormData({ category: "Electrical", description: "", priority: "Medium" });
      await loadComplaints();
    } catch (err) {
      setError(err.response?.data?.message || "Complaint submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-xl font-semibold mb-4">Submit a Complaint</h2>
        {error && <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <select
            name="category"
            className="border border-gray-300 rounded px-3 py-2"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <select
            name="priority"
            className="border border-gray-300 rounded px-3 py-2"
            value={formData.priority}
            onChange={handleChange}
          >
            {priorities.map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <textarea
            name="description"
            placeholder="Describe the issue..."
            className="md:col-span-3 border border-gray-300 rounded px-3 py-2 min-h-24"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </form>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">My Complaints</h3>
        <ComplaintTable complaints={complaints} />
      </section>
    </div>
  );
};

export default StudentDashboard;

