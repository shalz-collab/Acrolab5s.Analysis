import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [hero1, hero2, hero3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] overflow-hidden lg:h-[700px]">
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              AI-Powered 5S Analysis for Smarter Workspaces
            </h1>
            <p className="mb-8 font-body text-lg text-primary-foreground/80">
              Upload Before and After images to evaluate workplace improvement.
            </p>
            <Button asChild size="lg" className="font-heading font-semibold">
              <Link to="/analysis">Start Analysis</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
