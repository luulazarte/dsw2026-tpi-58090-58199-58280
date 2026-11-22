import Card from '../../shared/components/Card';

const BADGE_STYLES = {
  success: 'bg-med-active-bg text-med-active-text',
  neutral: 'bg-gray-100 text-gray-600',
  primary: 'bg-med-primary-100 text-med-primary-700',
};

function StatCard({
  icon,
  label,
  value,
  badgeLabel,
  badgeVariant = 'primary',
}) {
  return (
    <Card className="flex flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-med-primary-50 text-med-primary-900 flex items-center justify-center">
          {icon}
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${BADGE_STYLES[badgeVariant] ?? BADGE_STYLES.primary}`}
        >
          {badgeLabel}
        </span>
      </div>

      <div className="mt-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-med-text-sub">
          {label}
        </span>
        <p className="text-3xl sm:text-4xl font-extrabold text-med-primary-900 mt-1">
          {value}
        </p>
      </div>
    </Card>
  );
}

export default StatCard;
