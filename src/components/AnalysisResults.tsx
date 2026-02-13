import ScoreCard from "@/components/ScoreCard";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { type AnalysisResult, getScoreExplanation } from "@/lib/analysis";

interface Props {
  result: AnalysisResult;
  beforeImage?: string | null;
  afterImage?: string | null;
  onDownload?: () => void;
}

const scoreKeys: { label: string; key: keyof AnalysisResult["scores"] }[] = [
  { label: "Sort", key: "sort" },
  { label: "Set in Order", key: "setInOrder" },
  { label: "Shine", key: "shine" },
  { label: "Standardize", key: "standardize" },
  { label: "Sustain", key: "sustain" },
];

const AnalysisResults = ({ result, onDownload }: Props) => {
  return (
    <div className="space-y-10">
      {/* Summary */}
      <div>
        <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">Analysis Summary</h3>
        <p className="font-body leading-relaxed text-muted-foreground">{result.summary}</p>
      </div>

      {/* Scores */}
      <div>
        <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">5S Scores</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {scoreKeys.map((item) => (
            <ScoreCard key={item.key} label={item.label} score={result.scores[item.key]} />
          ))}
        </div>
      </div>

      {/* Score Explanations */}
      <div>
        <h3 className="mb-4 font-heading text-xl font-semibold text-foreground">Score Breakdown</h3>
        <div className="space-y-4">
          {scoreKeys.map((item) => (
            <div key={item.key} className="rounded-lg border border-border bg-card p-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-heading text-sm font-semibold text-foreground">{item.label}</span>
                <span className="font-heading text-sm font-bold text-primary">{result.scores[item.key]}%</span>
              </div>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {getScoreExplanation(item.key, result.scores[item.key], result.scoreExplanations?.[item.key])}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">Recommendations</h3>
        <ul className="list-inside list-disc space-y-2">
          {result.recommendations.map((r, i) => (
            <li key={i} className="font-body text-sm leading-relaxed text-muted-foreground">{r}</li>
          ))}
        </ul>
      </div>

      {/* Download */}
      {onDownload && (
        <Button onClick={onDownload} size="lg" className="w-full gap-2 font-heading font-semibold sm:w-auto">
          <Download size={18} /> Download Report
        </Button>
      )}
    </div>
  );
};

export default AnalysisResults;
