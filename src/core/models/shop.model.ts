export interface Shop{
    id: number,
    name: string,
    category: string,
    description: string,
    phoneNumber: string,
    timeFrom: string,
    timeTo: string,
    address: string,
    latitude: number,
    longitude: number,
    isFavourite: boolean,
    userId: number,
    rating: number,
    imageUrl: string,
    branchId: string,
    active: boolean,
    shopOwner: ShopOwner
}

export interface ShopOwner{
    website: string,
    ownerName: string,
    ownerLastName: string,
    ownerEmail: string,
    ownerPhoneNum: string,
}