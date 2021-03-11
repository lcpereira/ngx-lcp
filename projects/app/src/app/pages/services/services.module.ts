import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ServicesComponent } from './services.component';

@NgModule({
  declarations: [ServicesComponent, SpeechRecognitionComponent, UploadFileComponent],
  exports: [ServicesComponent],
  imports: [CommonModule],
})
export class ServicesModule {}
