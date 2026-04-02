import { useState, useEffect } from "react";
import { sellersAPI } from "../services/firestoreService";

/**
 * @typedef {Object} PendingSeller
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [businessName]
 * @property {'pending' | 'approved' | 'rejected'} status
 * @property {any} [createdAt]
 */

export default function SellerApprovalsPage() {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedSellerId, setSelectedSellerId] = useState(null);
  const [showRejectForm, setShowRejectForm] = useState(false);

  useEffect(() => {
    fetchPendingSellers();
  }, []);

  const fetchPendingSellers = async () => {
    try {
      setLoading(true);
      // Get all sellers with pending status
      const allSellers = await sellersAPI.getAll({ status: "pending" });
      setPendingSellers(allSellers || []);
    } catch (error) {
      console.error("Error fetching pending sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (sellerId) => {
    try {
      await sellersAPI.approve(sellerId);
      setPendingSellers((prev) => prev.filter((s) => s.id !== sellerId));
      alert("✅ Seller approved successfully!");
    } catch (error) {
      alert("❌ Error approving seller");
      console.error(error);
    }
  };

  const handleReject = async (sellerId) => {
    if (!rejectionReason.trim()) {
      alert("⚠️ Please provide a rejection reason");
      return;
    }

    try {
      await sellersAPI.reject(sellerId, rejectionReason);
      setPendingSellers((prev) => prev.filter((s) => s.id !== sellerId));
      setShowRejectForm(false);
      setRejectionReason("");
      setSelectedSellerId(null);
      alert("❌ Seller rejected");
    } catch (error) {
      alert("Error rejecting seller");
      console.error(error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    if (date.toDate) return date.toDate().toLocaleDateString();
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading pending sellers...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Approvals</h1>
        <p className="text-gray-600">
          Review and approve pending seller registrations
        </p>
      </div>

      {pendingSellers.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-gray-700 text-lg">
            ✅ All sellers have been reviewed. No pending approvals.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left font-semibold">
                  Seller Name
                </th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">
                  Business Name
                </th>
                <th className="px-6 py-3 text-left font-semibold">
                  Applied On
                </th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSellers.map((seller) => (
                <tr key={seller.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{seller.name}</td>
                  <td className="px-6 py-4 text-gray-600">{seller.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {seller.businessName || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(seller.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(seller.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSellerId(seller.id);
                          setShowRejectForm(true);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejection Form Modal */}
      {showRejectForm && selectedSellerId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Reject Seller</h2>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejection:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              rows={4}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowRejectForm(false);
                  setSelectedSellerId(null);
                  setRejectionReason("");
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedSellerId)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-2">Quick Stats</h3>
        <p className="text-gray-600">
          Pending sellers waiting for approval:{" "}
          <span className="font-bold text-lg">{pendingSellers.length}</span>
        </p>
      </div>
    </div>
  );
}
