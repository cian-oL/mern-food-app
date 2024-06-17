/* ===== USER TYPES ===== */

export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

/* ===== RESTAURANT TYPES ===== */
export type Restaurant = {
  _id: string;
  user: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type MenuItem = {
  name: string;
  price: number;
};
