import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent';
import { UploadFileErrorEnum } from './ngx-upload-file.enum';
import { UploadFileError, UploadFileSettings } from './ngx-upload-file.model';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'lib-ngx-upload-file',
  template: `
    <input
      #fileInput
      type="file"
      [accept]="settings?.acceptFileExtension"
      (change)="onFileSelected($event)"
    />
  `,
})
export class NgxUploadFileComponent {
  @Input() settings: UploadFileSettings | null = null;
  @Output() fileSelected = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef | null = null;

  openFileSelect(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: HTMLInputEvent): void {
    const files = event.target.files;

    if (!files || !files.length) {
      return;
    }

    const hasError = this.validadeFiles(files);

    if (hasError) {
      this.fileSelected.error(hasError);
    }

    this.fileSelected.emit({ files: Array.from(files), event });
  }

  validadeFiles(files: FileList): UploadFileError | null {
    let fileError: UploadFileError | null = null;

    Array.from(files).every((file: File) => {
      console.log(this.settings?.maxFileSize, file.size);
      if (this.settings?.maxFileSize && this.settings?.maxFileSize < file.size) {
        fileError = {
          code: UploadFileErrorEnum.FILE_MAX_SIZE,
          message: `The file size is larger than ${this.settings.maxFileSize}`,
        };

        return false;
      }

      return true;
    });

    return fileError;
  }
}
