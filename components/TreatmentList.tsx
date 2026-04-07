import { TreatmentStep } from '@/lib/types';

type TreatmentListProps = {
  treatments: TreatmentStep[];
};

export function TreatmentList({ treatments }: TreatmentListProps) {
  return (
    <ol className="space-y-2 text-sm">
      {treatments.map((step) => (
        <li key={`${step.order}-${step.raw}`} className="rounded-lg bg-panelSoft p-3">
          <span className="font-semibold text-slate-200">Step {step.order}:</span> {step.raw}
        </li>
      ))}
    </ol>
  );
}
