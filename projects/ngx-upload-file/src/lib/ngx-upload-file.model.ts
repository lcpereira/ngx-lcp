import { UploadFileErrorEnum } from './ngx-upload-file.enum';

export interface UploadFile {
  files: File[];
  event: Event;
}

export interface UploadFileSettings {
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
  minFileSize?: number;
  maxFileAmount?: number;
  minFileAmount?: number;
}

export interface UploadFileError {
  code: UploadFileErrorEnum;
  message: string;
}
