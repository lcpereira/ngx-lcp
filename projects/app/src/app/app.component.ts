import { Component } from '@angular/core';
import { NgxSpeechRecognitionService } from '@ngx-lcp/speech-recognition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  startedSpeechRecognition = false;
  textSpeechRecognition = '';
  interimTranscript = '';

  constructor(private speechRecognitionService: NgxSpeechRecognitionService) {}

  start(): void {
    this.startedSpeechRecognition = true;
    this.speechRecognitionService.start(
      (text: string) => {
        this.textSpeechRecognition = text;
      },
      (text2: string) => {
        this.interimTranscript = text2;
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
