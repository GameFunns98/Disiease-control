import { Disease, SymptomMatch } from '@/lib/types';
import { Badge } from './Badge';
import { TreatmentList } from './TreatmentList';

type DiseaseCardProps = {
  disease: Disease;
  match?: SymptomMatch;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
};

export function DiseaseCard({ disease, match, onToggleFavorite, isFavorite }: DiseaseCardProps) {
  const copyTreatment = async () => {
    const content = disease.treatments.map((item) => `${item.order}. ${item.raw}`).join('\n');
    await navigator.clipboard.writeText(`${disease.name}\n${content}`);
  };

  return (
    <article className="print-card rounded-xl border border-slate-700 bg-panel p-5 shadow-panel">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h3 className="mr-auto text-xl font-semibold">{disease.name}</h3>
        {match ? <Badge variant={match.isExactMatch ? 'exact' : 'partial'}>{match.isExactMatch ? 'Exact match' : 'Partial match'}</Badge> : null}
        {disease.hasUnknownData ? <Badge variant="unknown">Unknown data</Badge> : null}
      </div>

      {match ? (
        <div className="mb-4 space-y-1 text-sm text-slate-300">
          <p>
            Confidence: <strong>{Math.round(match.score * 100)}%</strong>
          </p>
          <p>
            Matched symptoms: <strong>{match.matchedSymptoms.length}</strong>
          </p>
          <p>Missing: {match.missingSymptoms.length ? match.missingSymptoms.join(', ') : 'None'}</p>
        </div>
      ) : null}

      <div className="mb-4">
        <h4 className="mb-2 font-medium text-slate-200">Symptoms</h4>
        <div className="flex flex-wrap gap-2">
          {disease.symptoms.map((symptom) => (
            <Badge key={symptom}>{symptom}</Badge>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="mb-2 font-medium text-slate-200">Treatment (ordered)</h4>
        <TreatmentList treatments={disease.treatments} />
      </div>

      {disease.notes ? <p className="mb-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">Notes: {disease.notes}</p> : null}

      <div className="no-print flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyTreatment}
          className="rounded-lg border border-slate-500 px-3 py-2 text-sm hover:bg-slate-700/40"
        >
          Copy treatment
        </button>
        <button
          type="button"
          onClick={() => onToggleFavorite?.(disease.id)}
          className="rounded-lg border border-slate-500 px-3 py-2 text-sm hover:bg-slate-700/40"
        >
          {isFavorite ? '★ Favorited' : '☆ Favorite'}
        </button>
      </div>
    </article>
  );
}
