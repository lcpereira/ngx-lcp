# @ngx-lcp/upload-file
Simple service to upload file.

[![Build Status](https://travis-ci.com/lcpereira/ngx-lcp.svg?branch=main)](https://travis-ci.com/lcpereira/ngx-lcp)

# Security Notice
This lib is still in development.

# Install
```bash
npm i @ngx-lcp/upload-file
```

# Usage
```typescript
import { NgxUploadFileService, UploadFile, UploadFileError } from '@ngx-lcp/ngx-upload-file';

...
constructor(private uploadFileService: NgxUploadFileService) {}

uploadFile(): void {
  this.uploadFileService.open().subscribe(
    (data: UploadFile) => {
      console.log(data.files);
    },
    (error: UploadFileError) => {
      console.error(error.message);
    }
  );
}
```

# License

[MIT](/LICENSE)
