interface StatsCardProps {
  title: string
  value: string
}

export default function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-md group-hover:bg-blue-500/30 transition-all"></div>

      {/* Card */}
      <div className="relative bg-blue-950/40 backdrop-blur-md border border-blue-800/50 rounded-3xl p-6 h-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/20 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-lg font-medium text-blue-200/80 mb-3">{title}</h3>
          <p className="text-5xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  )
}
