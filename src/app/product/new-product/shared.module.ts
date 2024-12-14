// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUploadDirective } from './upload.directive'; // Adjust the path to where your directive is

@NgModule({
  declarations: [ImgUploadDirective], // Declare the directive here
  exports: [ImgUploadDirective], // Export the directive so other modules can use it
  imports: [CommonModule],
})
export class SharedModule {}
