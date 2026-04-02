import { useState, useEffect } from "react";
import { categoriesService } from "../services/firestoreService";
import { getDefaultCategories } from "../data/firestoreData";
import { useToast } from "../hooks/useToast";

export default function CategoriesPage() {
  const toast = useToast();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newCat, setNewCat] = useState({
    icon: "📗",
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        let data = await categoriesService.getAll();
        if (!data || data.length === 0) {
          data = getDefaultCategories();
        }
        setCats(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCats(getDefaultCategories());
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = () => {
    if (!newCat.name) {
      toast("Please enter a category name");
      return;
    }
    setCats([...cats, { ...newCat, books: 0, createdAt: new Date() }]);
    setNewCat({ icon: "📗", name: "", description: "" });
    setShowForm(false);
    toast(`Category "${newCat.name}" added!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Loading categories...
      </div>
    );
  }

  return (
    <div>
      <div className="page-title">Category Management</div>
      <div className="page-sub">Organize the book marketplace taxonomy</div>

      <div className="flex gap-2 mb-5">
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Category"}
        </button>
      </div>

      {showForm && (
        <div className="section-card mb-5 max-w-lg">
          <div className="text-sm font-semibold text-slate-200 mb-4">
            New Category
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Icon (emoji)
              </label>
              <input
                className="form-input w-20"
                value={newCat.icon}
                onChange={(e) => setNewCat({ ...newCat, icon: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Category Name
              </label>
              <input
                className="form-input"
                placeholder="e.g. Travel"
                value={newCat.name}
                onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Description
              </label>
              <textarea
                className="form-input resize-none"
                rows={2}
                placeholder="Brief description…"
                value={newCat.description}
                onChange={(e) =>
                  setNewCat({ ...newCat, description: e.target.value })
                }
              />
            </div>
            <button className="btn-primary" onClick={addCategory}>
              Add Category
            </button>
          </div>
        </div>
      )}

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Icon", "Category Name", "Books", "Description", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {cats.map((c, i) => (
              <tr
                key={i}
                className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors"
              >
                <td className="px-4 py-3 text-2xl">{c.icon}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-200">
                  {c.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  {c.books.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-slate-400 max-w-xs">
                  {c.description}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    className="btn-action"
                    onClick={() => toast(`Edit form for "${c.name}" opened`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => {
                      if (c.books > 0) {
                        toast("Cannot delete — category has books");
                        return;
                      }
                      setCats(cats.filter((_, j) => j !== i));
                      toast(`Category "${c.name}" deleted`);
                    }}
                  >
                    Delete
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
