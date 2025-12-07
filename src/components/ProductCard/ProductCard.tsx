import React from "react";
import { ProductCardProps } from "../../types/ProductCardInterface";
import { BtnCounter } from "../../components";
import Link from "next/link";

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div
      className="rounded-md border border-gray-950  w-full font-sans text-base mb-4"
      style={{ boxShadow: "0 3px 5px rgba(0,0,0,0.4)" }}
    >
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

        <div className="border border-gray-950 rounded-md h-32 mt-5 ml-1  bg-gray-900 ">
          <Link href={`/products/${product.id}`}>
            <img
              src={product.images[0]}
              alt={product.title}
              width={130}
              height={130}
              className="rounded-md object-cover"
            />
          </Link>
          <div className="flex flex-col items-center justify-center w-32 text-center ">
            <BtnCounter
              txtBtn=" "
              onChange={(count) => onAddToCart(product, count)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
