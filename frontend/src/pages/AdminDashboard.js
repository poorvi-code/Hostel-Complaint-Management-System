import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Filter,
  RefreshCcw,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileText,
  BarChart3,
  Loader2,
  Search
} from "lucide-react";
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

  const stats = [
    { label: "Total Issues", value: counts.total, icon: FileText, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { label: "Pending", value: counts.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { label: "In Progress", value: counts.inProgress, icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
    { label: "Resolved", value: counts.resolved, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Administrator</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Console</h2>
        </div>
        <button
          onClick={loadComplaints}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white p-5 rounded-2xl border ${stat.border} shadow-sm flex items-center gap-4`}
          >
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Manage Complaints</h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>Category: {item}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>Status: {item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="m-6 flex items-center gap-2 bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
            <AlertCircle className="w-4 h-4" />
            <p>{error}</p>
          </div>
        )}

        <div className="p-0">
          <ComplaintTable complaints={complaints} onStatusChange={handleStatusChange} showStudent />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
