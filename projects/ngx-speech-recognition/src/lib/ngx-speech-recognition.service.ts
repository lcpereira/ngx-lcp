import { EventEmitter, Injectable } from '@angular/core';
import { NgxSpeechRecognition } from './ngx-speech-recognition.interface';
import { Observable } from 'rxjs';
import { SpeechRecognitionEnum } from './ngx-speech-recognition.enum';
import { SpeechRecognitionResponse } from './ngx-speech-recognition.model';

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
  private $speechRecognition = new EventEmitter<SpeechRecognitionResponse>();
  private speechRegocnize: SpeechRecognition | null = null;

  finalTranscript = '';

  constructor() {}

  private configureSpeech(): void {
    const speechRecognition = this.getSpeechRecognition();

    if (speechRecognition) {
      this.speechRegocnize = new speechRecognition();
    } else {
      this.onCantHeard(
        'Speech recognition is not supported in your browser.',
        SpeechRecognitionEnum.NOT_SUPPORTED
      );
    }

    if (this.speechRegocnize) {
      this.speechRegocnize.lang = 'pt-BR'; // TODO: put dynamic
      this.speechRegocnize.continuous = true; // TODO: put dynamic
      this.speechRegocnize.interimResults = true; // TODO: put dynamic
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
      this.$speechRecognition.emit({
        interimTranscript,
        finalTranscript: this.finalTranscript,
      });
    } catch (e) {
      this.onCantHeard(e);
    }
  }

  private onCantHeard(error: unknown, code?: SpeechRecognitionEnum): void {
    this.$speechRecognition.error({
      code: code || SpeechRecognitionEnum.UNKNOWN_ERROR,
      text: error,
    });
  }

  private getSpeechRecognition(): NgxSpeechRecognition {
    return (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition) as NgxSpeechRecognition;
  }

  start(): Observable<SpeechRecognitionResponse> {
    this.finalTranscript = '';

    setTimeout(() => {
      this.configureSpeech();

      if (this.speechRegocnize) {
        this.speechRegocnize.start();
      }
    });

    return this.$speechRecognition;
  }

  stop(): void {
    if (this.speechRegocnize) {
      this.speechRegocnize.stop();
    }
  }
}
