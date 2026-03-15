import { useState } from "react";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { reviews as initialReviews } from "../data/mockData";
import { useToast } from "../hooks/useToast";

export default function ReviewsPage() {
  const toast = useToast();
  const [reviews, setReviews] = useState(initialReviews);

  const updateStatus = (id, status, msg) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
    toast(msg);
  };

  const deleteReview = (id) => {
    setReviews(reviews.filter((r) => r.id !== id));
    toast("Review deleted");
  };

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <div>
      <div className="page-title">Reviews & Ratings Moderation</div>
      <div className="page-sub">Review, approve, and moderate user-submitted reviews</div>

      <div className="flex gap-2 mb-4">
        <select className="form-select">
          <option>All Status</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Flagged</option>
        </select>
      </div>

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Review ID", "Book", "User", "Rating", "Comment", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{r.id}</td>
                <td className="px-4 py-3 text-sm text-slate-200 font-medium max-w-[140px] truncate">{r.book}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={r.user} />
                    <span className="text-sm text-slate-300">{r.user}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-amber-400 text-sm tracking-tight">{stars(r.rating)}</td>
                <td className="px-4 py-3 text-sm text-slate-400 max-w-[200px] truncate italic">"{r.comment}"</td>
                <td className="px-4 py-3"><Badge status={r.status} /></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {r.status !== "Approved" && (
                    <button
                      className="btn-action text-green-400 mr-1"
                      onClick={() => updateStatus(r.id, "Approved", "Review approved!")}
                    >
                      Approve
                    </button>
                  )}
                  {r.status !== "Flagged" && (
                    <button
                      className="btn-action text-amber-400 mr-1"
                      onClick={() => updateStatus(r.id, "Flagged", "Review flagged for follow-up")}
                    >
                      Flag
                    </button>
                  )}
                  <button className="btn-danger" onClick={() => deleteReview(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-sm">No reviews to moderate.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
