import { Injectable } from '@angular/core';
import { NgxSpeechRecognition } from './ngx-speech-recognition.interface';

declare global {
  interface Window {
    SpeechRecognition: unknown;
    webkitSpeechRecognition: unknown;
    mozSpeechRecognition: unknown;
    msSpeechRecognition: unknown;
    oSpeechRecognition: unknown;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NgxSpeechRecognitionService {
  private listening: ((speach: string) => void) | null = null;
  private errorListening: ((erro: any) => void) | null = null;
  private speechRegocnize: SpeechRecognition | null = null;

  finalTranscript = '';

  constructor() {}

  private configureSpeech(): void {
    const speechRecognition = this.getSpeechRecognition();

    if (speechRecognition) {
      this.speechRegocnize = new speechRecognition();
    } else {
      if (this.errorListening) {
        this.errorListening('Speech recognition is not supported in your browser.');
      }
    }

    if (this.speechRegocnize) {
      this.speechRegocnize.lang = 'pt-BR';
      this.speechRegocnize.continuous = true;
      this.speechRegocnize.interimResults = true;
      this.speechRegocnize.addEventListener('result', (event: SpeechRecognitionEvent) =>
        this.onSpeak(event)
      );
      this.speechRegocnize.addEventListener('error', (error: unknown) => this.onCantHeard(error));
    }
  }

  private onSpeak(event: SpeechRecognitionEvent): void {
    let interimTranscript = '';
    for (let index = event.resultIndex; index < event.results.length; ++index) {
      if (event.results[index].isFinal) {
        this.finalTranscript = event.results[index][0].transcript;
      } else {
        interimTranscript += event.results[index][0].transcript;
      }
    }

    try {
      if (this.listening) {
        this.listening(this.finalTranscript + interimTranscript);
      }
    } catch (e) {
      this.onCantHeard(e);
    }
  }

  private onCantHeard(error: unknown): void {
    if (this.errorListening) {
      this.errorListening(error);
    }
  }

  private getSpeechRecognition(): NgxSpeechRecognition {
    return (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition) as NgxSpeechRecognition;
  }

  start(listening: (speach: string) => void, error?: (error: unknown) => void): void {
    this.listening = listening;

    if (error) {
      this.errorListening = error;
    }

    this.configureSpeech();

    if (this.speechRegocnize) {
      this.speechRegocnize.start();
    }
  }

  stop(): void {
    if (this.speechRegocnize) {
      this.speechRegocnize.stop();
    }
  }
}
