import { UploadFileErrorEnum } from './ngx-upload-file.enum';

export interface UploadFile {
  files: File[];
  event: Event;
}

export interface UploadFileSettings {
  acceptFileExtension?: string;
  maxFileSize?: number;
  minFileSize?: number;
}

export interface UploadFileError {
  code: UploadFileErrorEnum;
  message: string;
}
