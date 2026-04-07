import { allSymptoms } from '@/lib/diseases';

type SymptomSelectorProps = {
  selected: string[];
  manualSymptoms: string;
  onToggle: (symptom: string) => void;
  onManualChange: (value: string) => void;
};

export function SymptomSelector({ selected, manualSymptoms, onToggle, onManualChange }: SymptomSelectorProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-700 bg-panel p-5 shadow-panel">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Quick Symptom Picker</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {allSymptoms.map((symptom) => {
            const active = selected.includes(symptom);
            return (
              <button
                key={symptom}
                type="button"
                onClick={() => onToggle(symptom)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                  active ? 'border-accent bg-accent/20 text-sky-200' : 'border-slate-600 bg-slate-800/40 text-slate-200 hover:bg-slate-700/40'
                }`}
              >
                {symptom}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="manualSymptoms" className="mb-1 block text-sm font-medium text-slate-300">
          Additional symptoms (comma-separated)
        </label>
        <input
          id="manualSymptoms"
          value={manualSymptoms}
          onChange={(event) => onManualChange(event.target.value)}
          placeholder="e.g. Headache, Nausea"
          className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-accent placeholder:text-slate-500 focus:ring-2"
        />
      </div>
    </div>
  );
}
