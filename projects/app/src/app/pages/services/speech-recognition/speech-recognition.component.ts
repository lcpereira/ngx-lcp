import { Component } from '@angular/core';
import { NgxSpeechRecognitionService } from '@ngx-lcp/ngx-speech-recognition';

@Component({
  selector: 'app-speech-recognition',
  templateUrl: './speech-recognition.component.html',
  styleUrls: ['./speech-recognition.component.scss'],
})
export class SpeechRecognitionComponent {
  startedSpeechRecognition = false;
  textSpeechRecognition = '';

  constructor(private speechRecognitionService: NgxSpeechRecognitionService) {}

  start(): void {
    this.startedSpeechRecognition = true;
    this.textSpeechRecognition = '';
    this.speechRecognitionService.start(
      (text: string) => {
        this.textSpeechRecognition = text;
      },
      (error) => {
        this.stop();
        console.log(error);
      }
    );
  }

  stop(): void {
    this.startedSpeechRecognition = false;
    this.speechRecognitionService.stop();
  }
}
