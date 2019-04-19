export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface ResolvedAddress {
  latlng: LatLng;
  formattedAddress: string;
  completeAddress: {
    streetNum: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Category {
  display: string;
  value: string;
}

export interface HeaderPath{
  display: string,
  path: string
}