import { useState, useEffect } from "react";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { usersService } from "../services/firestoreService";
import { useToast } from "../hooks/useToast";

export default function UsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersService.getAll();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast("Error loading users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Loading users...
      </div>
    );
  }

  return (
    <div>
      <div className="page-title">User Management</div>
      <div className="page-sub">Manage all registered platform users</div>

      <div className="flex gap-2 mb-4">
        <input
          className="form-input max-w-xs"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-select">
          <option>All Status</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
        <button
          className="btn-primary ml-auto"
          onClick={() => toast("Exporting user list…")}
        >
          Export
        </button>
      </div>

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {[
                "User ID",
                "Name",
                "Email",
                "Registered",
                "Orders",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr
                key={u.id}
                className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-slate-400">
                  {u.id}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={u.name} />
                    <span className="text-sm text-slate-200">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">{u.email}</td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {u.registered}
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  {u.orders || 0}
                </td>
                <td className="px-4 py-3">
                  <Badge status={u.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    className="btn-action"
                    onClick={() => toast("Viewing user profile…")}
                  >
                    View
                  </button>
                  {u.status === "Active" ? (
                    <button
                      className="btn-danger"
                      onClick={() => toast(`${u.name}'s account suspended`)}
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      className="btn-action text-green-400"
                      onClick={() => toast(`${u.name}'s account restored`)}
                    >
                      Restore
                    </button>
                  )}
                  <button
                    className="btn-action ml-1"
                    onClick={() => toast("Password reset email sent")}
                  >
                    Reset Pwd
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
