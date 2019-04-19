import {AfterViewInit, ElementRef, Directive, Input} from '@angular/core';

@Directive({
  selector: '[fileUpload]',
  exportAs: 'child',
})
export class FileUploadTriggerDirective implements AfterViewInit {
  @Input() imgUpload;
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.addEventListener(
      'click',
      this.onClick.bind(this)
    );
  }

  onClick(event) {
    document.getElementById(this.imgUpload).click();
  }
}
