import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUploadFileComponent } from './ngx-upload-file.component';

describe('NgxUploadFileComponent', () => {
  let component: NgxUploadFileComponent;
  let fixture: ComponentFixture<NgxUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxUploadFileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
