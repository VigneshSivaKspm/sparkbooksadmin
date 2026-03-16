import { useState } from "react";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { admins as initialAdmins } from "../data/mockData";
import { useToast } from "../hooks/useToast";

export default function AdminsPage() {
  const toast = useToast();
  const [admins, setAdmins] = useState(initialAdmins);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin",
    permissions: "",
  });

  const addAdmin = () => {
    if (!form.name || !form.email) {
      toast("Please fill in name and email");
      return;
    }
    setAdmins([...admins, { ...form }]);
    setForm({ name: "", email: "", role: "Admin", permissions: "" });
    setShowForm(false);
    toast(`Admin "${form.name}" added!`);
  };

  return (
    <div>
      <div className="page-title">Admin Management</div>
      <div className="page-sub">
        Manage admin accounts and role-based permissions
      </div>

      <div className="flex gap-2 mb-4">
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Admin"}
        </button>
      </div>

      {showForm && (
        <div className="section-card mb-5 max-w-lg">
          <div className="text-sm font-semibold text-slate-200 mb-4">
            New Admin Account
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Full Name
              </label>
              <input
                className="form-input"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="jane@sparkbooks.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Role</label>
              <select
                className="form-select w-full"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option>Admin</option>
                <option>Moderator</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Permissions
              </label>
              <input
                className="form-input"
                placeholder="e.g. Books, Orders"
                value={form.permissions}
                onChange={(e) =>
                  setForm({ ...form, permissions: e.target.value })
                }
              />
            </div>
          </div>
          <button className="btn-primary mt-4" onClick={addAdmin}>
            Add Admin
          </button>
        </div>
      )}

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Name", "Email", "Role", "Permissions", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {admins.map((a, i) => (
              <tr
                key={i}
                className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={a.name} />
                    <span className="text-sm text-slate-200 font-medium">
                      {a.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">{a.email}</td>
                <td className="px-4 py-3">
                  <Badge status={a.role} />
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  {a.permissions}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {a.role === "Super Admin" ? (
                    <span className="text-xs text-slate-500 italic">
                      Protected account
                    </span>
                  ) : (
                    <>
                      <button
                        className="btn-action"
                        onClick={() => toast(`Edit form for ${a.name} opened`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          setAdmins(admins.filter((_, j) => j !== i));
                          toast(`${a.name} removed from admins`);
                        }}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Roles legend */}
      <div className="section-card mt-5">
        <div className="text-sm font-semibold text-slate-200 mb-3">
          Role Permissions Matrix
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-400">
                <th className="text-left py-2 pr-4 font-medium">Feature</th>
                <th className="text-center py-2 px-4 font-medium">
                  Super Admin
                </th>
                <th className="text-center py-2 px-4 font-medium">Admin</th>
                <th className="text-center py-2 px-4 font-medium">Moderator</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Dashboard & Analytics", true, true, false],
                ["User Management", true, true, false],
                ["Seller Management", true, true, false],
                ["Book Management", true, true, true],
                ["Order Management", true, true, false],
                ["Commission Settings", true, false, false],
                ["Reviews Moderation", true, true, true],
                ["Platform Settings", true, false, false],
                ["Admin Management", true, false, false],
                ["System Logs", true, true, false],
              ].map(([feature, sa, a, m]) => (
                <tr key={feature} className="border-t border-navy-500">
                  <td className="py-2 pr-4 text-slate-300">{feature}</td>
                  {[sa, a, m].map((v, i) => (
                    <td key={i} className="py-2 px-4 text-center">
                      <span className={v ? "text-green-400" : "text-slate-600"}>
                        {v ? "✓" : "✕"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
