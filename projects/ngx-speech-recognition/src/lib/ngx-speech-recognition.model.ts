import { SpeechRecognitionEnum } from './ngx-speech-recognition.enum';

export interface SpeechRecognitionResponse {
  interimTranscript: string;
  finalTranscript: string;
}

export interface SpeechRecognitionError {
  code: SpeechRecognitionEnum;
  error: unknown;
}
