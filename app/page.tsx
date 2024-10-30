import { Languages } from "lucide-react";
import { AccentAnalyzer } from "@/components/AccentAnalyzer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Languages className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Accent Analyzer</h1>
          <p className="text-muted-foreground">
            Speak in Mandarin to analyze whether the accent is Taiwanese or Chinese Mainland
          </p>
        </div>

        <AccentAnalyzer />

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Note: This is a simplified demonstration. For production use, 
            a more sophisticated machine learning model would be required 
            for accurate accent analysis.
          </p>
        </div>
      </div>
    </main>
  );
}