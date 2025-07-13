export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}
export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
  hasTopping: boolean
}

export type ProductAttribute = {
  name: string;
  value: string | boolean;
};
export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number
    }
  }
}
export type Product = {
  _id: string;
  name: string;
  image: string;
  priceConfiguration: ProductPriceConfiguration;
  attributes: ProductAttribute[];
  description: string;
  category: Category;
  isPublish: boolean;
  createdAt: string;
};

export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type Address = {
  text: string;
  isDefault: boolean
}
export type Customer ={
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[]
}

export type CouponTypeData = {
  code: string,
  tenantId: string
}