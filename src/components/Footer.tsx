import { Recycle } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-muted/50 py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
              <Recycle className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">Smart Disposal</span>
          </div>
          <p className="text-sm text-muted-foreground">Making waste disposal smarter, greener, and more rewarding for everyone.</p>
        </div>
        <div>
          <h4 className="mb-3 font-display font-semibold text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="/guide" className="hover:text-primary transition-colors">Recycling Guide</a></li>
            <li><a href="/rewards" className="hover:text-primary transition-colors">Rewards</a></li>
            <li><a href="/schedule" className="hover:text-primary transition-colors">Schedule Pickup</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display font-semibold text-foreground">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@smartdisposal.eco</li>
            <li>(555) 000-1234</li>
            <li>123 Green Street, Eco City</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Smart Disposal. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
