import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { ProductCard, ShoppingCard } from "../components";
import { ProductCardInterface } from "../types/ProductCardInterface";

interface Home {
  products: ProductCardInterface[];
}

export default function Home({ products }: Home) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [cart, setCart] = useState<{
    [id: number]: { product: ProductCardInterface; count: number };
  }>({});

  //#region lazy
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setVisibleCount((prev) => prev + 3);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  //#region handle add to cart price
  const handleAddToCart = (product: ProductCardInterface, count: number) => {
    setCart((prev) => {
      const updated = { ...prev };

      if (count === 0) {
        delete updated[product.id];
        return updated;
      }

      updated[product.id] = { product, count };
      return updated;
    });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      {visibleProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}

      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <ShoppingCard cart={cart} />
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    const products: ProductCardInterface[] = data.products;

    return {
      props: { products },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { products: [] },
    };
  }
};
