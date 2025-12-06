export interface ProductCardInterface {
  id: number;
  title: string;
  price: number;
  images: string[];
  discountPercentage?: number;
  description: string;
  category:string;
  rating: number;
  stock: number;
  tags:string [];
  brand:string;
  sku:string;
  weight:number;
  dimensions: {};
  warrantyInformation:string;
  shippingInformation:string;
  availabilityStatus:string;
  reviews:[{}];
  
}

export interface ProductCardProps {
  product: ProductCardInterface;
}
