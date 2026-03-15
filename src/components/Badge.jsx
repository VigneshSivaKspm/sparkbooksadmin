export default function Badge({ status }) {
  const map = {
    Active: "badge-green",
    Approved: "badge-green",
    Delivered: "badge-green",
    Paid: "badge-green",
    Pending: "badge-amber",
    "Pending Review": "badge-amber",
    Processing: "badge-amber",
    Shipped: "badge-blue",
    Suspended: "badge-red",
    Cancelled: "badge-red",
    Rejected: "badge-red",
    Flagged: "badge-red",
    "Super Admin": "badge-blue",
    Admin: "badge-purple",
    Moderator: "badge-green",
    Login: "badge-green",
    Seller: "badge-purple",
    Security: "badge-red",
    Moderation: "badge-amber",
    User: "badge-blue",
  };
  return (
    <span className={`badge ${map[status] || "badge-blue"}`}>{status}</span>
  );
}
