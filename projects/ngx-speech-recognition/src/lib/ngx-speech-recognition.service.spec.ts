import { TestBed } from '@angular/core/testing';

import { NgxSpeechRecognitionService } from './ngx-speech-recognition.service';

describe('NgxSpeechRecognitionService', () => {
  let service: NgxSpeechRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSpeechRecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
