"use client";

import { useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnalysisResult } from "./AnalysisResult";
import { ErrorAlert } from "./ErrorAlert";
import type { 
  SpeechRecognitionEvent, 
  SpeechRecognitionErrorEvent,
  SpeechRecognition 
} from "@/lib/types/speech-recognition";

export function AccentAnalyzer() {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startListening = async () => {
    try {
      const SpeechRecognitionConstructor =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognitionConstructor) {
        throw new Error(
          'Speech recognition is not supported in this browser. Please use a compatible browser like Google Chrome.'
        );
      }

      const recognition: SpeechRecognition = new SpeechRecognitionConstructor();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'zh-TW';

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Speech recognition started');
        setError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        const confidence = Math.round(event.results[0][0].confidence * 100);
        
        const taiwanesePatterns = /[\u3105-\u3129]/;
        const isTaiwanese = taiwanesePatterns.test(transcript) || confidence > 90;
        
        setResult(isTaiwanese ? 'Taiwanese' : 'Chinese Mainland');
        setConfidence(confidence);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech Recognition Error:', event);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setError('Microphone access was denied. Please allow microphone access and try again.');
        } else {
          setError('Error occurred during recognition: ' + event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
      };

      recognition.start();
    } catch (err) {
      console.error('Start Listening Error:', err);
      setError((err as Error).message);
      setIsListening(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-center">
          <Button
            size="lg"
            variant={isListening ? "destructive" : "default"}
            onClick={startListening}
            className="rounded-full w-24 h-24 flex items-center justify-center"
            disabled={isListening}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
        </div>

        {isListening && (
          <div className="text-center animate-pulse">
            <Volume2 className="w-8 h-8 mx-auto mb-2" />
            <p>Listening...</p>
          </div>
        )}

        {result && <AnalysisResult result={result} confidence={confidence} />}
        {error && <ErrorAlert message={error} />}
      </div>
    </Card>
  );
}