import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AnalysisResults from "@/components/AnalysisResults";
import { type AnalysisResult } from "@/lib/analysis";
import { generateReport } from "@/lib/generatePdf";
import { supabase } from "@/integrations/supabase/client";

const AnalysisPage = () => {
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!beforeImg || !afterImg) return;
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-5s", {
        body: { beforeImage: beforeImg, afterImage: afterImg },
      });

      if (error) {
        throw new Error(error.message || "Analysis failed");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setResult(data as AnalysisResult);
      toast.success("Analysis complete!");
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast.error(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-2 font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
          5S Workplace Analysis
        </h1>
        <p className="mb-8 font-body text-sm text-muted-foreground sm:mb-10 sm:text-base">
          Upload your Before and After workplace images to evaluate improvement with AI.
        </p>

        {/* Upload area */}
        <div className="mb-6 grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Before */}
          <div
            onClick={() => beforeRef.current?.click()}
            className="group flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary transition-colors hover:border-primary overflow-hidden sm:min-h-[220px]"
          >
            {beforeImg ? (
              <img src={beforeImg} alt="Before" className="h-full w-full object-cover" />
            ) : (
              <>
                <Upload className="mb-2 text-muted-foreground group-hover:text-primary" size={28} />
                <span className="font-heading text-sm font-semibold text-muted-foreground">Upload Before Image</span>
                <span className="mt-1 text-xs text-muted-foreground">Click to browse</span>
              </>
            )}
            <input ref={beforeRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, setBeforeImg)} />
          </div>

          {/* After */}
          <div
            onClick={() => afterRef.current?.click()}
            className="group flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary transition-colors hover:border-primary overflow-hidden sm:min-h-[220px]"
          >
            {afterImg ? (
              <img src={afterImg} alt="After" className="h-full w-full object-cover" />
            ) : (
              <>
                <Upload className="mb-2 text-muted-foreground group-hover:text-primary" size={28} />
                <span className="font-heading text-sm font-semibold text-muted-foreground">Upload After Image</span>
                <span className="mt-1 text-xs text-muted-foreground">Click to browse</span>
              </>
            )}
            <input ref={afterRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, setAfterImg)} />
          </div>
        </div>

        <Button
          onClick={handleAnalyze}
          disabled={!beforeImg || !afterImg || loading}
          size="lg"
          className="mb-10 w-full gap-2 font-heading font-semibold sm:mb-12 sm:w-auto"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Analyzing with AI…" : "Run AI Analysis"}
        </Button>

        {result && (
          <AnalysisResults
            result={result}
            beforeImage={beforeImg}
            afterImage={afterImg}
            onDownload={() => generateReport(result, beforeImg, afterImg)}
          />
        )}
      </div>
    </main>
  );
};

export default AnalysisPage;
