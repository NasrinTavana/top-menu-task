// src/pages/index.tsx
import { GetServerSideProps } from "next";
import ProductCard from "../components/ProductCard/ProductCard";
import { ProductCardInterface } from "../types/ProductCardInterface";

interface Home {
  products: ProductCardInterface[];
}

export default function Home({ products }: Home) {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// SSR: داده‌ها سمت سرور گرفته می‌شوند
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
