export type TreatmentStep = {
  order: number;
  label: string;
  dosage?: string;
  raw: string;
  isUnknown?: boolean;
};

export type Disease = {
  id: string;
  name: string;
  symptoms: string[];
  treatments: TreatmentStep[];
  notes?: string;
  hasUnknownData?: boolean;
};

export type SymptomMatch = {
  disease: Disease;
  matchedSymptoms: string[];
  missingSymptoms: string[];
  score: number;
  isExactMatch: boolean;
};
