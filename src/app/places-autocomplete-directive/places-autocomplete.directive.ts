import { Directive, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[places-autocomplete]'
})
export class PlacesAutocompleteDirective implements OnInit {
  private element: HTMLInputElement;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {
    this.element = elRef.nativeElement;
  }

  ngOnInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.element);
    autocomplete.addListener('place_changed', () => {
      this.onSelect.emit(autocomplete.getPlace())
    })
  }

}
