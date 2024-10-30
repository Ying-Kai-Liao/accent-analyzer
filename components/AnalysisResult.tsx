import { Progress } from "@/components/ui/progress";

interface AnalysisResultProps {
  result: string;
  confidence: number;
}

export function AnalysisResult({ result, confidence }: AnalysisResultProps) {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Result</h2>
        <p className="text-xl text-primary">{result}</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Confidence</span>
          <span>{confidence}%</span>
        </div>
        <Progress value={confidence} />
      </div>
    </div>
  );
}