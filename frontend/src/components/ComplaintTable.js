import React from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  User,
  Tag,
  AlertTriangle,
  Info
} from "lucide-react";

const statusConfig = {
  Pending: {
    color: "text-amber-700 bg-amber-50 border-amber-100",
    icon: Clock
  },
  "In Progress": {
    color: "text-blue-700 bg-blue-50 border-blue-100",
    icon: AlertCircle
  },
  Resolved: {
    color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    icon: CheckCircle2
  }
};

const priorityConfig = {
  High: "text-red-600 bg-red-50",
  Medium: "text-blue-600 bg-blue-50",
  Low: "text-gray-600 bg-gray-50"
};

const ComplaintTable = ({ complaints, onStatusChange, showStudent = false }) => {
  if (!complaints.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium tracking-tight">No issues found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Issue Details</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Priority</th>
              <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Status</th>
              {showStudent && <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">Submitted By</th>}
              {onStatusChange && <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 text-right">Update Status</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {complaints.map((item) => {
              const StatusIcon = statusConfig[item.status]?.icon || AlertCircle;
              const statusStyle = statusConfig[item.status]?.color || "text-gray-600 bg-gray-50";

              return (
                <tr key={item._id} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                        <Tag className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="font-semibold text-gray-900 text-sm">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 min-w-[300px]">
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {item.description}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">
                      ID: {item._id.slice(-8)}
                    </p>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-tight ${priorityConfig[item.priority]}`}>
                      <AlertTriangle className="w-3 h-3" />
                      {item.priority}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${statusStyle}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {item.status}
                    </div>
                  </td>
                  {showStudent && (
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                          {item.student?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{item.student?.name}</p>
                          <p className="text-xs text-gray-500">{item.student?.email}</p>
                        </div>
                      </div>
                    </td>
                  )}
                  {onStatusChange && (
                    <td className="px-6 py-5 text-right">
                      <select
                        className="bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer shadow-sm active:scale-95"
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintTable;

