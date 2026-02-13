import { CheckCircle } from "lucide-react";

const fiveS = [
  { title: "Sort", desc: "Remove unnecessary items from the workspace." },
  { title: "Set in Order", desc: "Arrange items for easy access and efficient workflow." },
  { title: "Shine", desc: "Clean the workspace and maintain its appearance." },
  { title: "Standardize", desc: "Establish consistent procedures and standards." },
  { title: "Sustain", desc: "Maintain discipline and continuous improvement." },
];

const AboutPage = () => (
  <main className="section-padding">
    <div className="container mx-auto max-w-3xl">
      <h1 className="mb-6 font-heading text-3xl font-bold text-foreground md:text-4xl">
        About ArcoLabs
      </h1>
      <p className="mb-10 font-body leading-relaxed text-muted-foreground">
        ArcoLabs provides AI-based workplace optimization tools designed to help organizations
        achieve higher efficiency, productivity, and safety. Our platform leverages advanced image
        analysis to evaluate workspaces against the 5S methodology — a proven framework for lean
        management and continuous improvement.
      </p>

      <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">
        The 5S Methodology
      </h2>
      <div className="space-y-4">
        {fiveS.map((item) => (
          <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
            <CheckCircle className="mt-0.5 shrink-0 text-primary" size={20} />
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default AboutPage;
