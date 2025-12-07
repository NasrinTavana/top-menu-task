interface ShoppingCardIn {
  cart: {
    [id: number]: { product: any; count: number };
  };
}

//#region 
export default function ShoppingCard({ cart }: ShoppingCardIn) {
  const total = Object.values(cart).reduce((sum, i) => {
    return sum + i.product.price * i.count;
  }, 0);

  const totalCount = Object.values(cart).reduce((sum, i) => {
    return sum + i.count;
  }, 0);

  return (
    <div className="w-100 rounded-md bg-pink-600 text-white flex flex-row justify-between p-4 items-center ">
      <div>
        <span className="text-xl font-bold">Total:</span>
        <span className="ml-2 text-2xl font-bold">${total.toFixed(2)}</span>
      </div>
      <div>
        <span className="">Complete Purchase</span>
        <span className="rounded-full bg-gray-700 px-3 py-1.5 ml-2">
          {totalCount}
        </span>
      </div>
    </div>
  );
}
