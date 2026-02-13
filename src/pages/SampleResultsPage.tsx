import sampleBefore from "@/assets/sample-before.jpg";
import sampleAfter from "@/assets/sample-after.jpg";
import AnalysisResults from "@/components/AnalysisResults";
import { sampleResult } from "@/lib/analysis";
import { generateReport } from "@/lib/generatePdf";

const SampleResultsPage = () => (
  <main className="section-padding">
    <div className="container mx-auto max-w-4xl">
      <h1 className="mb-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
        Sample Results
      </h1>
      <p className="mb-10 font-body text-muted-foreground">
        See how the 5S analysis works with an example Before &amp; After comparison.
      </p>

      <div className="mb-10 grid gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-border">
          <p className="bg-secondary px-4 py-2 font-heading text-sm font-semibold text-muted-foreground">Before</p>
          <img src={sampleBefore} alt="Sample Before" className="w-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <p className="bg-secondary px-4 py-2 font-heading text-sm font-semibold text-muted-foreground">After</p>
          <img src={sampleAfter} alt="Sample After" className="w-full object-cover" />
        </div>
      </div>

      <AnalysisResults
        result={sampleResult}
        beforeImage={sampleBefore}
        afterImage={sampleAfter}
        onDownload={() => generateReport(sampleResult, sampleBefore, sampleAfter)}
      />
    </div>
  </main>
);

export default SampleResultsPage;
