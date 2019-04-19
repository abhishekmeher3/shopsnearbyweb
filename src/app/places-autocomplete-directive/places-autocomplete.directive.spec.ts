import { PlacesAutocompleteDirective } from './places-autocomplete.directive';

describe('PlacesAutocompleteDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
      nativeElement: document.createElement('div')
    };
    const directive = new PlacesAutocompleteDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
