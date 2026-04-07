import { Disease } from './types';

const t = (order: number, raw: string) => {
  const [label, dosage] = raw.split(/\s(?=\d+%$)/);
  const unknown = raw.includes('???') || raw.includes('??') || raw.includes('depends');

  return {
    order,
    label: label || raw,
    dosage,
    raw,
    isUnknown: unknown,
  };
};

export const diseases: Disease[] = [
  {
    id: 'the-farts',
    name: 'The Farts',
    symptoms: ['Foul Smell', 'Abdominal pain'],
    treatments: [t(1, 'Cetrifuge 80%')],
  },
  {
    id: 'fever',
    name: 'Fever',
    symptoms: ['Feeling warm', 'Tired'],
    treatments: [t(1, 'Cold 40%')],
  },
  {
    id: 'bloxulosis',
    name: 'Bloxulosis',
    symptoms: ['Unwell', 'Coughing', 'Fatigue'],
    treatments: [t(1, 'Wind 60%'), t(2, 'Radiation 60%')],
  },
  {
    id: 'randpox',
    name: 'Randpox',
    symptoms: ['Energetic', '??'],
    treatments: [t(1, 'It depends..')],
    notes: 'Incomplete disease data',
    hasUnknownData: true,
  },
  {
    id: 'fur',
    name: 'Fur',
    symptoms: ['Feeling dizzy', 'Sneezing'],
    treatments: [t(1, 'Cold 100%')],
  },
  {
    id: 'epox',
    name: 'Epox',
    symptoms: ['Itchy Nose', '??'],
    treatments: [t(1, 'Cold 40%'), t(2, 'Wind 100%'), t(3, 'Centrifuge 20%')],
  },
  {
    id: 'zombie',
    name: 'Zombie',
    symptoms: ['Tired', 'Hungry', 'Need brains'],
    treatments: [t(1, 'Cold 100%'), t(2, 'Radiation 100%'), t(3, 'Cold 0%'), t(4, 'Wind 20%')],
  },
  {
    id: 'claus',
    name: 'Claus',
    symptoms: ['Christmas spirit'],
    treatments: [t(1, '???')],
    notes: 'Treatment unknown',
    hasUnknownData: true,
  },
  {
    id: 'useless',
    name: 'Useless',
    symptoms: ['Useless'],
    treatments: [t(1, 'Radiation 20%'), t(2, '??')],
    notes: 'Partial treatment unknown',
    hasUnknownData: true,
  },
  {
    id: 'flu',
    name: 'Flu',
    symptoms: ['Runny Nose', 'Sneezing', 'Dry throat'],
    treatments: [t(1, 'Heat 20%')],
  },
  {
    id: 'killer',
    name: 'Killer',
    symptoms: ['Runny Nose', 'Dry throat'],
    treatments: [t(1, 'Radiation 10%'), t(2, 'Heat 90%')],
  },
  {
    id: 'drbm',
    name: 'D.R.B.M',
    symptoms: ['Coughing', 'Tired', 'Numbness'],
    treatments: [t(1, 'Heat 80%'), t(2, 'Centrifuge 100%'), t(3, 'Wind 50%')],
  },
  {
    id: 'bloxpox',
    name: 'Bloxpox',
    symptoms: ['Sneezing', 'Coughing'],
    treatments: [t(1, 'Radiation 30%'), t(2, 'Wind 70%'), t(3, 'Cold 50%')],
  },
  {
    id: 'bloxburn',
    name: 'Bloxburn',
    symptoms: ['Feeling warm', 'Sweating', 'Grey'],
    treatments: [t(1, 'Radiation 50%'), t(2, 'Radiation 100%'), t(3, 'Centrifuge 100%')],
  },
].map((disease) => ({
  ...disease,
  hasUnknownData: disease.hasUnknownData || disease.symptoms.some((s) => s.includes('?')) || disease.treatments.some((tr) => tr.isUnknown),
}));

export const allSymptoms = [...new Set(diseases.flatMap((d) => d.symptoms))].sort((a, b) => a.localeCompare(b));
