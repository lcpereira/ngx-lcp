import { Injectable } from '@angular/core';

declare class webkitSpeechRecognition extends SpeechRecognition { }

@Injectable({
  providedIn: 'root'
})
export class NgxSpeechRecognitionService {
  private listening: ((speach: string) => void);
  private errorListening: ((erro: any) => void);
  private speechRegocnize: SpeechRecognition | webkitSpeechRecognition;

  finalTranscript = '';

  constructor() {
    if (typeof webkitSpeechRecognition !== 'undefined') {
      this.speechRegocnize = new webkitSpeechRecognition();
    } else if (typeof SpeechRecognition !== 'undefined') {
      this.speechRegocnize = new SpeechRecognition();
    } else {
      throw new Error('Speech recognition is not supported in your browser.');
    }

    this.speechRegocnize.lang = 'pt-BR';
    this.speechRegocnize.continuous = true;
    this.speechRegocnize.interimResults = true;
    this.speechRegocnize.addEventListener('result', (event: SpeechRecognitionEvent) => this.onSpeak(event));
    this.speechRegocnize.addEventListener('error', (e) => this.onCantHeard(e));
  }

  private onSpeak(event: SpeechRecognitionEvent) {
    let interim_transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        this.finalTranscript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    try {
      this.listening(this.finalTranscript + interim_transcript);
    } catch (e) {
      this.onCantHeard(e);
    }
  }

  private onCantHeard(e) {
    console.error(e);

    if (this.errorListening) {
      this.errorListening(e);
    }
  }

  start(listening: (speach: string) => void, error?: (error: any) => void) {
    this.listening = listening;
    this.errorListening = error;

    if (this.speechRegocnize) {
      this.speechRegocnize.start();
    }
  }

  stop() {
    if (this.speechRegocnize) {
      this.speechRegocnize.stop();
    }
  }

  speak(text: string) {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
}
