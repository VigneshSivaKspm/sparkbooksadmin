import { useState, useEffect } from "react";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { adminsService } from "../services/firestoreService";
import { useToast } from "../hooks/useToast";

export default function AdminsPage() {
  const toast = useToast();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin",
    permissions: "",
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const data = await adminsService.getAll();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast("Error loading admins");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const addAdmin = async () => {
    if (!form.name || !form.email) {
      toast("Please fill in name and email");
      return;
    }
    try {
      const newAdmin = await adminsService.create(form);
      setAdmins([...admins, newAdmin]);
      setForm({ name: "", email: "", role: "Admin", permissions: "" });
      setShowForm(false);
      toast(`Admin "${form.name}" added!`);
    } catch (error) {
      console.error("Error adding admin:", error);
      toast("Error adding admin");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Loading admins...
      </div>
    );
  }

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
                placeholder="e.g. John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Role</label>
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option>Super Admin</option>
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
                placeholder="e.g. Full Access"
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
              {["Name", "Email", "Role", "Permissions", "Status", "Manage"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr
                key={a.id}
                className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={a.name} />
                    <span className="text-sm text-slate-200">{a.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-400">{a.email}</td>
                <td className="px-4 py-3 text-sm text-slate-200">{a.role}</td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {a.permissions}
                </td>
                <td className="px-4 py-3">
                  <Badge status="Active" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    className="btn-action"
                    onClick={() => toast("Edit admin")}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger ml-1"
                    onClick={() => toast("Admin removed")}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
