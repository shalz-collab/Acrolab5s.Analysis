import logo from "@/assets/arcolabs-logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-secondary py-10">
    <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
      <img src={logo} alt="ArcoLabs" className="h-10 w-auto" />
      <p className="font-body text-sm text-muted-foreground">
        AI-Powered 5S Workplace Analysis
      </p>
      <p className="font-body text-xs text-muted-foreground">
        © 2026 SHALINI MK
      </p>
    </div>
  </footer>
);

export default Footer;
