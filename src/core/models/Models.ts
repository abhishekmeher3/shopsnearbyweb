export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface ResolvedAddress {
  latlng: LatLng;
  formattedAddress: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Category {
  display: string;
  value: string;
}
