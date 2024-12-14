import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';

@Directive({
  selector: '[appImgUpload]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImgUploadDirective),
      multi: true,
    },
  ],
})
export class ImgUploadDirective implements OnInit, ControlValueAccessor {
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // This can be used to ensure the directive works with forms
  }

  @HostListener('onUpload', ['$event'])
  onUpload(event: FileUploadEvent) {
    const uploadedFiles = event.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      this.onChange(file); // Notify form control of the new file
    }
  }

  // Implement ControlValueAccessor methods
  writeValue(value: any): void {
    // Handle the write operation (e.g., for initial file load)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
