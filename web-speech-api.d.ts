// web-speech-api.d.ts

interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechRecognition?: new () => SpeechRecognition;
  }
  
  interface SpeechRecognition {
    lang: string;
    onstart?: () => void;
    onresult?: (event: SpeechRecognitionEvent) => void;
    onend?: () => void;
    start: () => void;
    stop?: () => void;
  }
  
  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
  }
  
  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
  }
  
  interface SpeechRecognitionAlternative {
    transcript: string;
  }
  