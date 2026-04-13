import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-4 px-4 mt-auto border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-muted-foreground font-medium flex items-center gap-2">
          Made By an Ass-pirant with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for fellow Aspirants.
        </p>
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Bawa Enterprises. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
