import { Injectable } from '@angular/core';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    mozSpeechRecognition: any;
    msSpeechRecognition: any;
    oSpeechRecognition: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NgxSpeechRecognitionService {
  private listening: (speach: string) => void;
  private listeningTmp: (speach: string) => void;
  private errorListening: (erro: any) => void;
  private speechRegocnize: SpeechRecognition;

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
      this.listening(this.finalTranscript + interimTranscript);
    } catch (e) {
      this.onCantHeard(e);
    }
  }

  private onCantHeard(error: unknown): void {
    if (this.errorListening) {
      this.errorListening(error);
    }
  }

  // TODO: add typing to that method
  private getSpeechRecognition(): any {
    return (
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition
    );
  }

  start(
    listening: (speach: string) => void,
    listeningTmp: (speach: string) => void,
    error?: (error: unknown) => void
  ): void {
    this.listening = listening;
    this.listeningTmp = listeningTmp;

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
