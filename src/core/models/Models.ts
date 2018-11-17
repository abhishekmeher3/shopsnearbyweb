export interface LatLng{
    latitude: number,
    longitude: number
}

export interface ResolvedAddress{
    latlng: LatLng,
    formattedAddress: string
}