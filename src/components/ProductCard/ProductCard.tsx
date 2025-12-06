import React from "react";
import { ProductCardProps } from "../../types/ProductCardInterface";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="rounded-md border shadow-md w-100 font-sans text-base mb-4">
      <div className="flex flex-row px-4">
        <div className="pt-0 pl-4 font-medium text-with absolute">
          {product.discountPercentage && (
            <div>
              <p className="w-10 h-12 bg-red-500 text-base text-center rounded-b-md text-white shadow-sm">
                %{Math.round(product.discountPercentage)}
                <br />
                Off
              </p>
            </div>
          )}
        </div>

        <div className="w-2/3 mt-14 mb-4">
          <h2 className="font-bold line-clamp-1">{product.title}</h2>

          <p className="line-clamp-2 mt-1 mb-2">{product.description}</p>
          <del>${product.discountPercentage}</del>
          <p>
            $ <span className="font-bold">{product.price}</span>
          </p>
        </div>

        <div className="border rounded-md h-32 mt-5 ml-1">
          <img src={product.images[0]} alt={product.title} className="w-32" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
