export interface AnalysisResult {
  summary: string;
  scores: { sort: number; setInOrder: number; shine: number; standardize: number; sustain: number };
  scoreExplanations?: {
    sort: string;
    setInOrder: string;
    shine: string;
    standardize: string;
    sustain: string;
  };
  recommendations: string[];
}

export function getScoreExplanation(
  key: keyof AnalysisResult["scores"],
  score: number,
  aiExplanation?: string
): string {
  if (aiExplanation) return aiExplanation;

  const fallbacks: Record<keyof AnalysisResult["scores"], (s: number) => string> = {
    sort: (s) =>
      s >= 85
        ? "Excellent sorting — unnecessary items have been effectively removed, leaving only essential tools and materials."
        : s >= 65
        ? "Good progress on sorting. Some non-essential items remain that could be relocated or discarded."
        : "Sorting needs improvement. The workspace still contains many unnecessary items.",
    setInOrder: (s) =>
      s >= 85
        ? "Items are well-organized with clear designated locations, minimizing search time."
        : s >= 65
        ? "Moderate organization. Some items have designated spots, but several areas lack labeling."
        : "Organization is lacking. Items are placed randomly.",
    shine: (s) =>
      s >= 85
        ? "The workspace is clean and well-maintained. Surfaces are free of dust and debris."
        : s >= 65
        ? "Cleanliness has improved but some areas still show neglected surfaces."
        : "The workspace requires thorough cleaning.",
    standardize: (s) =>
      s >= 85
        ? "Strong standardization in place with consistent procedures and visual controls."
        : s >= 65
        ? "Some standards exist but are not consistently applied."
        : "Standardization is weak. No clear procedures are in place.",
    sustain: (s) =>
      s >= 85
        ? "Excellent discipline and culture of continuous improvement."
        : s >= 65
        ? "Sustainability shows promise but needs reinforcement with regular audits."
        : "Sustaining 5S practices is a challenge without regular audits and team buy-in.",
  };

  return fallbacks[key](score);
}

export const sampleResult: AnalysisResult = {
  summary:
    "The sample workspace demonstrated a clear transition from a cluttered, disorganized desk to a well-structured, clean environment. Unnecessary items were removed, tools were properly stored, and surfaces were cleaned. The improvement supports better productivity and a safer working environment.",
  scores: { sort: 88, setInOrder: 82, shine: 91, standardize: 75, sustain: 70 },
  scoreExplanations: {
    sort: "Most unnecessary items like scattered papers and loose supplies have been removed. Only essential items remain on the desk surface.",
    setInOrder: "Tools and supplies now have designated locations with organizers and shelving, though some areas could benefit from clearer labeling.",
    shine: "Surfaces are visibly clean with no dust or debris. Equipment appears well-maintained and polished.",
    standardize: "Basic organizational standards are evident, but formal labeling and documented procedures are only partially implemented.",
    sustain: "Initial improvements are strong, but without visible audit schedules or checklists, long-term sustainability remains uncertain.",
  },
  recommendations: [
    "Introduce labeling systems for drawers and shelves.",
    "Establish a return-to-place policy for shared equipment.",
    "Add ergonomic improvements alongside the 5S process.",
    "Conduct monthly 5S audits with a scoring checklist.",
  ],
};
