import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechRecognitionComponent } from './speech-recognition/speech-recognition.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ServicesComponent } from './services.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ServicesComponent, SpeechRecognitionComponent, UploadFileComponent],
  exports: [ServicesComponent],
  imports: [CommonModule, FormsModule],
})
export class ServicesModule {}
