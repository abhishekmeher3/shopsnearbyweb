import {
  Component,
  ViewChild,
  ElementRef,
  AfterContentInit,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';

@Component({
  selector: 'basic-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements AfterContentInit {
  @ViewChild('toast') toast: ElementRef;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input('text') toastText: string;
  ngAfterContentInit() {
    const element = this.toast.nativeElement;
    element.className = 'show';
    let k = this;
    setTimeout(function() {
      element.className = element.className.replace('show', '');
      k.closeEvent.emit();
    }, 3000);
  }
}
