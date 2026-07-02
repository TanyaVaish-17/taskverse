import { FiCheckCircle, FiAlertCircle, FiList, FiTrendingUp } from 'react-icons/fi';

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="flex items-center gap-2.5 bg-base-900 border border-base-800 rounded-lg px-3 py-2 hover:border-base-600 transition-colors duration-200">
      <div className={`p-1.5 rounded-md ${accent}`}>
        <Icon size={13} />
      </div>
      <div className="min-w-0">
        <p className="text-base font-serif text-stone-100 leading-none">{value}</p>
        <p className="text-[11px] text-stone-600 mt-0.5 truncate">{label}</p>
      </div>
    </div>
  );
}

function AnalyticsStrip({ analytics, loading }) {
  if (loading || !analytics) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 overflow-x-auto">
      <StatCard
        icon={FiList}
        label="Total tasks"
        value={analytics.total}
        accent="bg-base-800 text-stone-500"
      />
      <StatCard
        icon={FiCheckCircle}
        label="Done"
        value={analytics.byStatus.done}
        accent="bg-accent-500/15 text-accent-500"
      />
      <StatCard
        icon={FiAlertCircle}
        label="Overdue"
        value={analytics.overdueCount}
        accent="bg-red-950 text-red-400"
      />
      <StatCard
        icon={FiTrendingUp}
        label="Completed this week"
        value={analytics.completedThisWeek}
        accent="bg-priority-low/15 text-priority-low"
      />
    </div>
  );
}

export default AnalyticsStrip;