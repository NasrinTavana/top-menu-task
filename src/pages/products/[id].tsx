import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { ProductCardInterface } from "../../types/ProductCardInterface";
import { BtnCounter, ShoppingCard } from "../../components";

interface ProductPageIn {
  product: ProductCardInterface | null;
  onAddToCart?: (count: number) => void;
}

export default function ProductPage({ product }: ProductPageIn) {
  if (!product) return <p>Product not found!!</p>;

  //#region cart counter
  const [cart, setCart] = useState<{
    [id: number]: {count: number };
  }>({});

  const handleAddToCart = ( count: number) => {
    setCart((prev) => {
      const updated = { ...prev };

      if (count === 0) {
        delete updated[product.id];
        return updated;
      }

      updated[product.id] = {count };
      return updated;
    });
  };

  return (
    <div className="relative max-w-md mx-auto bg-gray-900 text-white h-screen flex flex-col overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      <div className="flex-1 overflow-y-auto scrollbar-hide bg-black/20 backdrop-blur-md rounded-t-3xl relative ">
        {product.discountPercentage && (
          <p className="absolute top-8 w-16 h-12 bg-red-600 text-center text-white rounded-e-lg shadow-sm">
            %{Math.round(product.discountPercentage)}
            <br />
            Off
          </p>
        )}

        <div className="mt-28 p-4">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div className="flex justify-between items-center mt-8">
            <div>
              <del className="mr-2">${product.discountPercentage}</del>
              <span className="bg-pink-600 px-2 py-1 rounded-full text-black">
                %{Math.round(product?.discountPercentage || 0)}
              </span>
              <p className="mt-2 text-xl font-bold">${product.price}</p>
            </div>

            <div className="flex flex-col items-center justify-center w-32">
              <BtnCounter
                txtBtn=" "
                onChange={(count) => handleAddToCart(count)}
              />
            </div>
          </div>

          <div className="mt-6">
            <p>{product.description}</p>
          </div>
        </div>

        <div className="h-32 " />
      </div>

      <div className="fixed bottom-0 item-center w-[448] h-28 bg-black/20 backdrop-blur-md z-30 rounded-t-3xl flex items-center justify-center">
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 p-4 items-center">
          <div className="w-full max-w-md ">
            <ShoppingCard cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  try {
    const res = await fetch(`https://dummyjson.com/products/${Number(id)}`);
    const product: ProductCardInterface = await res.json();
    return { props: { product } };
  } catch (error) {
    return { props: { product: null } };
  }
};
