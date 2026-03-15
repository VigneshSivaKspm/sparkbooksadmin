export default function MetricCard({ icon, label, value, delta, deltaUp }) {
  return (
    <div className="metric-card">
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
        <span className="text-base">{icon}</span>
        {label}
      </div>
      <div className="text-2xl font-semibold text-slate-100 leading-none">{value}</div>
      {delta && (
        <div className={`text-xs mt-1.5 ${deltaUp === true ? "text-green-400" : deltaUp === false ? "text-red-400" : "text-slate-400"}`}>
          {delta}
        </div>
      )}
    </div>
  );
}
