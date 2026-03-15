import { useState } from "react";
import { useToast } from "../hooks/useToast";

const recent = [
  { dot: "bg-brand", title: "Platform maintenance on Mar 20", target: "All users", date: "Mar 14" },
  { dot: "bg-amber-400", title: "New commission policy effective April 1", target: "All sellers", date: "Mar 12" },
  { dot: "bg-green-400", title: "Spring sale event announcement", target: "All users", date: "Mar 10" },
  { dot: "bg-violet-400", title: "Seller payout processed for March", target: "All sellers", date: "Mar 1" },
];

export default function NotificationsPage() {
  const toast = useToast();
  const [form, setForm] = useState({ title: "", message: "", audience: "All Users" });

  const send = () => {
    if (!form.title || !form.message) { toast("Please fill in title and message"); return; }
    toast(`Notification sent to "${form.audience}"!`);
    setForm({ title: "", message: "", audience: "All Users" });
  };

  return (
    <div>
      <div className="page-title">Notifications</div>
      <div className="page-sub">Send platform-wide and targeted notifications</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Compose */}
        <div className="section-card">
          <div className="text-sm font-semibold text-slate-200 mb-4">Send Notification</div>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Title</label>
              <input
                className="form-input"
                placeholder="Notification title…"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Message</label>
              <textarea
                className="form-input resize-none"
                rows={4}
                placeholder="Write your message here…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Audience</label>
              <select
                className="form-select w-full"
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
              >
                <option>All Users</option>
                <option>All Sellers</option>
                <option>Pending Sellers</option>
                <option>Specific User</option>
                <option>Active Sellers Only</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="btn-primary" onClick={send}>Send Notification</button>
              <button
                className="btn-action"
                onClick={() => setForm({ title: "", message: "", audience: "All Users" })}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Recent */}
        <div>
          <div className="text-sm font-semibold text-slate-200 mb-3">Recent Notifications</div>
          <div className="space-y-2">
            {recent.map((n, i) => (
              <div key={i} className="section-card flex items-start gap-3 hover:border-navy-400 transition-colors">
                <div className={`w-2.5 h-2.5 rounded-full ${n.dot} mt-1.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-200 leading-snug">{n.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">Sent to {n.target}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-500">{n.date}</span>
                  </div>
                </div>
                <button
                  className="btn-action text-xs flex-shrink-0"
                  onClick={() => toast("Resending notification…")}
                >
                  Resend
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
