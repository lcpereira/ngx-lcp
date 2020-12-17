import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSpeechRecognitionComponent } from './ngx-speech-recognition.component';

describe('NgxSpeechRecognitionComponent', () => {
  let component: NgxSpeechRecognitionComponent;
  let fixture: ComponentFixture<NgxSpeechRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSpeechRecognitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSpeechRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
