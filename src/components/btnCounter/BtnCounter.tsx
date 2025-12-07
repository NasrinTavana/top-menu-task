import React, { useState } from "react";

interface BtnCounter {
  txtBtn: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  onChange?: (count: number) => void;
}

function Button({ txtBtn, onClick }: BtnCounter) {
  return <button onClick={onClick}>{txtBtn}</button>;
}
export default function Counter({ onChange }: BtnCounter) {
  const [count, setCount] = useState(0);

  //#region
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onChange?.(newCount);
  };

  //#region
  const isAdd = count > 0;
  return (
    <div
      className={`
        rounded-md transition-all duration-300 text-center -mt-4
        bg-pink-600 text-white
      `}
      style={{
        width: isAdd ? "100px" : "40px",
        height: "40px",
      }}
    >
      <div className="flex items-center gap-2 justify-center p-2">
        {isAdd && (
          <Button txtBtn="-" onClick={decrement} disabled={count <= 0} />
        )}
        {isAdd && (
          <span className="text-lg font-bold w-8 text-center">{count}</span>
        )}
        <Button txtBtn="+" onClick={increment} />
      </div>
    </div>
  );
}
