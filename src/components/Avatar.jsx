const colors = [
  "bg-brand/20 text-brand",
  "bg-violet-500/20 text-violet-400",
  "bg-teal-500/20 text-teal-400",
  "bg-amber-500/20 text-amber-400",
  "bg-red-500/20 text-red-400",
  "bg-green-500/20 text-green-400",
];

export default function Avatar({ name, size = "sm" }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const color = colors[name.charCodeAt(0) % colors.length];
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <span className={`inline-flex items-center justify-center ${sz} rounded-lg ${color} font-semibold flex-shrink-0`}>
      {initials}
    </span>
  );
}
