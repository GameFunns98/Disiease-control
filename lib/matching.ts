import { Disease, SymptomMatch } from './types';

export const normalize = (value: string) => value.trim().toLowerCase();

export const findByDiseaseName = (query: string, diseases: Disease[]): Disease[] => {
  const q = normalize(query);
  if (!q) return [];

  return diseases.filter((disease) => normalize(disease.name).includes(q));
};

export const rankBySymptoms = (selectedSymptoms: string[], diseases: Disease[]): SymptomMatch[] => {
  const normalizedSelected = selectedSymptoms.map(normalize).filter(Boolean);
  if (normalizedSelected.length === 0) return [];

  const results = diseases
    .map((disease) => {
      const diseaseSymptomsNorm = disease.symptoms.map(normalize);
      const matchedSymptoms = disease.symptoms.filter((symptom) => normalizedSelected.includes(normalize(symptom)));
      const missingSymptoms = disease.symptoms.filter((symptom) => !normalizedSelected.includes(normalize(symptom)));
      const score = matchedSymptoms.length / disease.symptoms.length;

      return {
        disease,
        matchedSymptoms,
        missingSymptoms,
        score,
        isExactMatch: matchedSymptoms.length === diseaseSymptomsNorm.length,
      };
    })
    .filter((result) => result.matchedSymptoms.length > 0)
    .sort((a, b) => b.score - a.score || b.matchedSymptoms.length - a.matchedSymptoms.length || a.disease.name.localeCompare(b.disease.name));

  return results;
};
