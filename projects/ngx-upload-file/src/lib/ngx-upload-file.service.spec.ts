import { TestBed } from '@angular/core/testing';

import { NgxUploadFileService } from './ngx-upload-file.service';

describe('NgxUploadFileService', () => {
  let service: NgxUploadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxUploadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
