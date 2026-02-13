interface ScoreCardProps {
  label: string;
  score: number;
}

const ScoreCard = ({ label, score }: ScoreCardProps) => (
  <div className="flex flex-col items-center rounded-lg border border-border bg-card p-4 text-center shadow-sm">
    <span className="mb-2 font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
    <div className="relative h-20 w-20">
      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
        <path
          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          className="stroke-muted"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          className="stroke-primary"
          strokeWidth="3"
          strokeDasharray={`${score}, 100`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-heading text-lg font-bold text-foreground">
        {score}%
      </span>
    </div>
  </div>
);

export default ScoreCard;
