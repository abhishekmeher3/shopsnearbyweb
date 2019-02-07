import {Injectable} from '@angular/core';

@Injectable()
export class HeaderService {
  constants: any = {
    HOME_P_TITLE: 'Looking for Restaurant Nearby?',
    HOME_S_TITLE: 'Search for shops nearby you',
    ADD_SHOP_P_TITLE: 'Add Your Shop',
    ADD_SHOP_S_TITLE: 'Enter your shop details to get listed',
  };
  constructor() {}
  public getContent(route: string) {
    let head = null;
    switch (route) {
      case 'home':
        head = {
          pHeading: this.constants.HOME_P_TITLE,
          sHeading: this.constants.HOME_S_TITLE,
        };
        break;
      case 'add-shop':
        head = {
          pHeading: this.constants.ADD_SHOP_P_TITLE,
          sHeading: this.constants.ADD_SHOP_S_TITLE,
        };
        break;
      default:
        head = {
          pHeading: '',
          sHeading: '',
        };
    }
    return head;
  }
}
