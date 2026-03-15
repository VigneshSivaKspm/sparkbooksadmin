import { useState } from "react";
import { useToast } from "../hooks/useToast";

export default function SettingsPage() {
  const toast = useToast();
  const [tab, setTab] = useState("General");
  const tabs = ["General", "Payment", "Marketplace", "Security"];

  return (
    <div>
      <div className="page-title">Platform Settings</div>
      <div className="page-sub">Configure general, payment, and security settings</div>

      <div className="flex gap-0.5 border-b border-navy-500 mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm transition-colors -mb-px border-b-2 ${
              tab === t ? "text-brand border-brand" : "text-slate-400 border-transparent hover:text-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "General" && (
        <div className="section-card max-w-xl">
          <div className="text-sm font-semibold text-slate-200 mb-4">General Settings</div>
          <div className="space-y-4">
            <Row label="Platform Name" sub="Displayed across all user interfaces">
              <input className="form-input w-56" defaultValue="BookVault Marketplace" />
            </Row>
            <Row label="Default Currency" sub="Used for pricing and payouts">
              <select className="form-select">
                <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option><option>INR (₹)</option>
              </select>
            </Row>
            <Row label="Timezone" sub="Server and display timezone">
              <select className="form-select">
                <option>UTC+0</option><option>UTC+5:30 (IST)</option><option>UTC-5 (EST)</option><option>UTC+9 (JST)</option>
              </select>
            </Row>
            <Row label="Support Email" sub="Shown to users on error pages">
              <input className="form-input w-56" defaultValue="support@bookvault.com" />
            </Row>
          </div>
          <button className="btn-primary mt-5" onClick={() => toast("General settings saved!")}>Save Changes</button>
        </div>
      )}

      {tab === "Payment" && (
        <div className="section-card max-w-xl">
          <div className="text-sm font-semibold text-slate-200 mb-4">Payment Settings</div>
          <div className="space-y-4">
            <Row label="Stripe Publishable Key" sub="Used in frontend checkout">
              <input className="form-input w-64 font-mono text-xs" defaultValue="pk_live_••••••••••••••" />
            </Row>
            <Row label="Stripe Secret Key" sub="Server-side key — keep secret">
              <input type="password" className="form-input w-64 font-mono text-xs" defaultValue="sk_live_••••••••••••" />
            </Row>
            <Row label="Razorpay Key ID" sub="For India region payments">
              <input className="form-input w-64 font-mono text-xs" defaultValue="rzp_live_••••••••••" />
            </Row>
            <Row label="Payment Methods" sub="Accepted on checkout">
              <div className="flex flex-col gap-1.5 text-sm text-slate-300">
                {["Card", "UPI", "Net Banking", "Wallets"].map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-brand" />
                    {m}
                  </label>
                ))}
              </div>
            </Row>
          </div>
          <button className="btn-primary mt-5" onClick={() => toast("Payment settings saved!")}>Save Changes</button>
        </div>
      )}

      {tab === "Marketplace" && (
        <div className="section-card max-w-xl">
          <div className="text-sm font-semibold text-slate-200 mb-4">Marketplace Settings</div>
          <div className="space-y-4">
            <Row label="Default Commission %" sub="Global rate applied to all sales">
              <div className="flex items-center gap-2">
                <input type="number" className="form-input w-16 text-center" defaultValue={10} />
                <span className="text-slate-400">%</span>
              </div>
            </Row>
            <Row label="Seller Approval" sub="New sellers must be reviewed before listing">
              <select className="form-select">
                <option>Yes — Manual Review</option>
                <option>No — Auto Approve</option>
              </select>
            </Row>
            <Row label="Listing Approval" sub="New book listings require admin review">
              <select className="form-select">
                <option>Yes — Manual Review</option>
                <option>No — Auto Approve</option>
              </select>
            </Row>
            <Row label="Max Books per Seller" sub="Limit listings per seller account">
              <input type="number" className="form-input w-20 text-center" defaultValue={500} />
            </Row>
          </div>
          <button className="btn-primary mt-5" onClick={() => toast("Marketplace settings saved!")}>Save Changes</button>
        </div>
      )}

      {tab === "Security" && (
        <div className="section-card max-w-xl">
          <div className="text-sm font-semibold text-slate-200 mb-4">Security Settings</div>
          <div className="space-y-4">
            <Row label="Two-Factor Authentication" sub="Require 2FA for all admin accounts">
              <select className="form-select">
                <option>Enabled (Required)</option>
                <option>Optional</option>
                <option>Disabled</option>
              </select>
            </Row>
            <Row label="Session Timeout" sub="Auto-logout after inactivity">
              <select className="form-select">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
                <option>Never</option>
              </select>
            </Row>
            <Row label="Firebase API Key" sub="Public API key for client SDK">
              <input className="form-input w-64 font-mono text-xs" defaultValue="AIzaSy••••••••••••••••••••" />
            </Row>
            <Row label="Admin Whitelist IPs" sub="Only these IPs can access admin panel">
              <textarea className="form-input w-64 resize-none text-xs font-mono" rows={2} defaultValue="203.0.113.0/24&#10;198.51.100.0/24" />
            </Row>
          </div>
          <button className="btn-primary mt-5" onClick={() => toast("Security settings saved!")}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

function Row({ label, sub, children }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-navy-500 last:border-0 gap-4">
      <div>
        <div className="text-sm font-medium text-slate-200">{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}
