'use client';

import { useMemo, useState } from 'react';
import { DiseaseCard } from '@/components/DiseaseCard';
import { SymptomSelector } from '@/components/SymptomSelector';
import { diseases } from '@/lib/diseases';
import { findByDiseaseName, rankBySymptoms } from '@/lib/matching';

const FAVORITES_KEY = 'roblox-mdt-favorites';
const RECENTS_KEY = 'roblox-mdt-recent-searches';

type Tab = 'disease' | 'symptoms';

const readStorageArray = (key: string) => {
  if (typeof window === 'undefined') return [] as string[];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [] as string[];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as string[];
  }
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('disease');
  const [diseaseQuery, setDiseaseQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [manualSymptoms, setManualSymptoms] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => readStorageArray(FAVORITES_KEY));
  const [recentDiseaseSearches, setRecentDiseaseSearches] = useState<string[]>(() => readStorageArray(RECENTS_KEY));

  const diseaseResults = useMemo(() => findByDiseaseName(diseaseQuery, diseases), [diseaseQuery]);

  const symptomInput = useMemo(
    () => [...selectedSymptoms, ...manualSymptoms.split(',').map((symptom) => symptom.trim()).filter(Boolean)],
    [selectedSymptoms, manualSymptoms],
  );

  const symptomResults = useMemo(() => rankBySymptoms(symptomInput, diseases), [symptomInput]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((current) => (current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom]));
  };

  const persistArray = (key: string, values: string[]) => {
    window.localStorage.setItem(key, JSON.stringify(values));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      persistArray(FAVORITES_KEY, next);
      return next;
    });
  };

  const resetFilters = () => {
    setDiseaseQuery('');
    setManualSymptoms('');
    setSelectedSymptoms([]);
  };

  const onDiseaseSearch = (value: string) => {
    setDiseaseQuery(value);
    if (!value.trim()) return;
    setRecentDiseaseSearches((current) => {
      const next = [value, ...current.filter((item) => item !== value)].slice(0, 6);
      persistArray(RECENTS_KEY, next);
      return next;
    });
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <header className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-white">Roblox Medical MDT</h1>
          <button type="button" onClick={() => window.print()} className="no-print ml-auto rounded-lg border border-slate-500 px-3 py-2 text-sm hover:bg-slate-700/40">
            Print view
          </button>
        </header>

        <div className="no-print mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('disease')}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${activeTab === 'disease' ? 'bg-accent text-slate-900' : 'bg-panelSoft text-slate-200'}`}
          >
            Search by disease
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('symptoms')}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${activeTab === 'symptoms' ? 'bg-accent text-slate-900' : 'bg-panelSoft text-slate-200'}`}
          >
            Search by symptoms
          </button>
          <button type="button" onClick={resetFilters} className="ml-auto rounded-lg border border-slate-500 px-3 py-2 text-sm hover:bg-slate-700/40">
            Reset filters
          </button>
        </div>

        {activeTab === 'disease' ? (
          <section className="space-y-4">
            <div className="no-print rounded-xl border border-slate-700 bg-panel p-5 shadow-panel">
              <label htmlFor="diseaseSearch" className="mb-2 block text-sm text-slate-300">
                Disease name
              </label>
              <input
                id="diseaseSearch"
                value={diseaseQuery}
                onChange={(event) => onDiseaseSearch(event.target.value)}
                placeholder="Type disease name"
                className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-3 py-2 outline-none ring-accent placeholder:text-slate-500 focus:ring-2"
              />
              {recentDiseaseSearches.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Recent:</span>
                  {recentDiseaseSearches.map((item) => (
                    <button key={item} type="button" onClick={() => setDiseaseQuery(item)} className="rounded-full bg-slate-700/50 px-3 py-1 text-xs">
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {(diseaseQuery ? diseaseResults : diseases).map((disease) => (
                <DiseaseCard key={disease.id} disease={disease} onToggleFavorite={toggleFavorite} isFavorite={favorites.includes(disease.id)} />
              ))}
            </div>
          </section>
        ) : (
          <section className="space-y-4">
            <SymptomSelector
              selected={selectedSymptoms}
              manualSymptoms={manualSymptoms}
              onToggle={toggleSymptom}
              onManualChange={setManualSymptoms}
            />

            <div className="grid gap-4 lg:grid-cols-2">
              {symptomResults.map((result) => (
                <DiseaseCard
                  key={result.disease.id}
                  disease={result.disease}
                  match={result}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(result.disease.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
