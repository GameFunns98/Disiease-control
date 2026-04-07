import clsx from 'clsx';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'exact' | 'partial' | 'unknown';
};

const styles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-slate-700/60 text-slate-200 border-slate-500/60',
  exact: 'bg-good/20 text-green-300 border-green-500/40',
  partial: 'bg-accent/20 text-sky-300 border-sky-500/40',
  unknown: 'bg-warn/20 text-amber-300 border-amber-500/40',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={clsx('rounded-full border px-2 py-1 text-xs font-medium', styles[variant])}>{children}</span>;
}
