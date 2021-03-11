import {
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injectable,
  Injector,
} from '@angular/core';
import { NgxUploadFileComponent } from './ngx-upload-file.component';
import { UploadFile, UploadFileSettings } from './ngx-upload-file.model';

@Injectable({
  providedIn: 'root',
})
export class NgxUploadFileService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  open(settings?: UploadFileSettings): EventEmitter<UploadFile> {
    const componentRef = this.getComponentRef(settings);
    componentRef.instance.openFileSelect();
    return componentRef.instance.fileSelected;
  }

  private getComponentRef(settings?: UploadFileSettings): ComponentRef<NgxUploadFileComponent> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(NgxUploadFileComponent)
      .create(this.injector);

    componentRef.instance.settings = settings || null;
    componentRef.changeDetectorRef.detectChanges();

    return componentRef;
  }
}
