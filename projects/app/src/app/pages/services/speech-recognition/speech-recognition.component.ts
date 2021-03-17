import { Component } from '@angular/core';
import {
  NgxSpeechRecognitionService,
  SpeechRecognitionResponse,
} from '@ngx-lcp/ngx-speech-recognition';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss'],
})
export class SpeechRecognitionComponent {
  startedSpeechRecognition = false;
  speechRecognition: SpeechRecognitionResponse | null = null;

  constructor(private speechRecognitionService: NgxSpeechRecognitionService) {}

  start(): void {
    this.startedSpeechRecognition = true;
    this.speechRecognition = null;
    this.speechRecognitionService.start().subscribe(
      (speechRecognition: SpeechRecognitionResponse) =>
        (this.speechRecognition = speechRecognition),
      () => this.stop()
    );
  }

  stop(): void {
    this.startedSpeechRecognition = false;
    this.speechRecognitionService.stop();
  }
}
