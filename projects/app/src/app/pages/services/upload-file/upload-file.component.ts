import { Component } from '@angular/core';
import { NgxUploadFileService, UploadFile, UploadFileError } from '@ngx-lcp/ngx-upload-file';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  files: File[] = [];

  constructor(private uploadFileService: NgxUploadFileService) {}

  uploadFile(): void {
    this.uploadFileService.open().subscribe(
      (data: UploadFile) => {
        this.files = this.files.concat(data.files);
      },
      (error: UploadFileError) => {
        console.log(error.message);
      }
    );
  }
}
