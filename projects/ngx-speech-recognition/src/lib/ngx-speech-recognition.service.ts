import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgxSpeechRecognitionService {
  private listening: (speach: string) => void;
  private errorListening: (erro: any) => void;
  private speechRegocnize: SpeechRecognition;

  finalTranscript = '';

  constructor() {
    const speechRecognition = this.getSpeechRecognition();

    if (speechRecognition) {
      this.speechRegocnize = new speechRecognition();
    } else {
      throw new Error('Speech recognition is not supported in your browser.');
    }

    this.speechRegocnize.lang = 'pt-BR';
    this.speechRegocnize.continuous = true;
    this.speechRegocnize.interimResults = true;
    this.speechRegocnize.addEventListener('result', (event: SpeechRecognitionEvent) =>
      this.onSpeak(event)
    );
    this.speechRegocnize.addEventListener('error', (e) => this.onCantHeard(e));
  }

  private onSpeak(event: SpeechRecognitionEvent): void {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        this.finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    try {
      this.listening(this.finalTranscript + interimTranscript);
    } catch (e) {
      this.onCantHeard(e);
    }
  }

  private onCantHeard(e): void {
    console.error(e);

    if (this.errorListening) {
      this.errorListening(e);
    }
  }

  // TODO: add typing to that method
  private getSpeechRecognition(): any {
    return (
      // tslint:disable-next-line: no-string-literal
      window['SpeechRecognition'] ||
      // tslint:disable-next-line: no-string-literal
      window['webkitSpeechRecognition'] ||
      // tslint:disable-next-line: no-string-literal
      window['mozSpeechRecognition'] ||
      // tslint:disable-next-line: no-string-literal
      window['msSpeechRecognition'] ||
      // tslint:disable-next-line: no-string-literal
      window['oSpeechRecognition']
    );
  }

  start(listening: (speach: string) => void, error?: (error: any) => void): void {
    this.listening = listening;
    this.errorListening = error;

    if (this.speechRegocnize) {
      this.speechRegocnize.start();
    }
  }

  stop(): void {
    if (this.speechRegocnize) {
      this.speechRegocnize.stop();
    }
  }

  speak(text: string): void {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
}
