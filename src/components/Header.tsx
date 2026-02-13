import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/arcolabs-logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
{ label: "Home", path: "/" },
{ label: "Analysis", path: "/analysis" },
{ label: "Sample Results", path: "/sample-results" },
{ label: "About", path: "/about" }];


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ArcoLabs" className="h-12 w-auto" />
          <span className="font-heading text-xl font-bold text-foreground">Arcolab</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) =>
          <Link
            key={item.path}
            to={item.path}
            className={`font-body text-sm font-medium transition-colors hover:text-primary ${
            location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`
            }>

              {item.label}
            </Link>
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">

            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen &&
      <nav className="border-t border-border bg-background px-4 py-4 md:hidden">
          {navItems.map((item) =>
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setMobileOpen(false)}
          className={`block py-2 font-body text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`
          }>

              {item.label}
            </Link>
        )}
        </nav>
      }
    </header>);

};

export default Header;