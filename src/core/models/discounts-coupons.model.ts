export interface Discounts {
  id: number;
  description: string;
  actualPrice: string;
  specialPrice: string;
  validFrom: Date;
  validTo: Date;
  code: string;
  offPercentage: string;
  imageUrl: string;
  verified: boolean;
  shopBranchId: string;
  shopId: number;
  userId: number;
  shopname: string;
  validity: string;
}

export interface Coupons {
  id: number;
  description: string;
  conditions: string;
  validFrom: Date;
  validTo: Date;
  code: string;
  offPercentage: string;
  imageUrl: string;
  verified: boolean;
  shopBranchId: string;
  shopId: number;
  userId: number;
  shopname: string;
  validity: string;
}
