import HeroSlider from "@/components/HeroSlider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Upload, FileText, Shield } from "lucide-react";

const features = [
  { icon: Upload, title: "Upload Images", desc: "Upload Before and After workplace images for analysis." },
  { icon: BarChart3, title: "5S Scoring", desc: "Get detailed scores for each 5S category with AI analysis." },
  { icon: FileText, title: "PDF Reports", desc: "Download comprehensive reports with scores and recommendations." },
  { icon: Shield, title: "Lean Management", desc: "Support your lean management journey with data-driven insights." },
];

const Index = () => (
  <>
    <HeroSlider />

    {/* Features */}
    <section className="section-padding bg-secondary">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center font-heading text-2xl font-bold text-foreground md:text-3xl">
          How It Works
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-card p-6 text-center shadow-sm">
              <f.icon className="mx-auto mb-4 text-primary" size={32} />
              <h3 className="mb-2 font-heading text-base font-semibold text-foreground">{f.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container mx-auto text-center">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
          Ready to Optimize Your Workspace?
        </h2>
        <p className="mx-auto mb-8 max-w-xl font-body text-muted-foreground">
          Start your 5S analysis today and discover actionable insights to improve workplace efficiency.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="font-heading font-semibold">
            <Link to="/analysis">Start Analysis</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-heading font-semibold">
            <Link to="/sample-results">View Sample Results</Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default Index;
