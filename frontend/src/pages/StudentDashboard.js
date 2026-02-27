import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  PlusCircle,
  Send,
  AlertCircle,
  CheckCircle2,
  Clock,
  History,
  MessageSquare,
  Zap,
  Droplets,
  CloudRain,
  Wifi,
  Armchair,
  MoreHorizontal,
  Loader2
} from "lucide-react";
import { getMyComplaints, submitComplaint } from "../api";
import ComplaintTable from "../components/ComplaintTable";

const categories = [
  { id: "Electrical", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "Plumbing", icon: Droplets, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "Cleaning", icon: CloudRain, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "Internet", icon: Wifi, color: "text-purple-500", bg: "bg-purple-50" },
  { id: "Furniture", icon: Armchair, color: "text-orange-500", bg: "bg-orange-50" },
  { id: "Other", icon: MoreHorizontal, color: "text-slate-500", bg: "bg-slate-50" },
];

const priorities = [
  { id: "Low", color: "text-gray-600", bg: "bg-gray-100" },
  { id: "Medium", color: "text-blue-600", bg: "bg-blue-100" },
  { id: "High", color: "text-red-600", bg: "bg-red-100" },
];

const StudentDashboard = () => {
  const [formData, setFormData] = useState({
    category: "Electrical",
    description: "",
    priority: "Medium"
  });
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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

  const setCategory = (catId) => {
    setFormData(prev => ({ ...prev, category: catId }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await submitComplaint(formData);
      setFormData({ category: "Electrical", description: "", priority: "Medium" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      await loadComplaints();
    } catch (err) {
      setError(err.response?.data?.message || "Complaint submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Student Dashboard</h2>
          <p className="text-gray-500 mt-1">Manage and track your hostel issues.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 transition-all hover:border-blue-200">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <History className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Complaints</p>
              <p className="text-xl font-bold text-gray-900">{complaints.length}</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 transition-all hover:border-emerald-200">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resolved</p>
              <p className="text-xl font-bold text-gray-900">
                {complaints.filter(c => c.status === "Resolved").length}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <PlusCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">New Complaint</h3>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-2 bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
                <AlertCircle className="w-4 h-4" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-center gap-2 bg-emerald-50 text-emerald-600 text-sm p-4 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
                <p>Complaint submitted successfully!</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = formData.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${isSelected
                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-white"
                          }`}
                      >
                        <Icon className={`w-5 h-5 mb-1 ${isSelected ? "text-white" : cat.color}`} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">{cat.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-700 block mb-2">Priority Level</label>
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    {priorities.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, priority: p.id }))}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.priority === p.id
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                          }`}
                      >
                        {p.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 block ml-1">Issue Description</label>
                <textarea
                  name="description"
                  placeholder="Please describe the issue in detail..."
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none min-h-[120px] resize-none"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4 py-3.5 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Your History</h3>
              </div>
              {loading && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
            </div>

            <div className="p-0 flex-1">
              <ComplaintTable complaints={complaints} />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;

