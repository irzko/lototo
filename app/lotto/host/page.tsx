"use client";
import arrayShuffle from "@/lib/arrayShuffle";
import getRandomNumber from "@/lib/getRandomNumber";
import React from "react";

const CellResult = ({
  value,
  isChecked,
}: {
  value: number;
  isChecked: boolean;
}) => {
  return (
    <div
      className={`aspect-square font-semibold rounded-lg flex justify-center border items-center ${
        isChecked ? "bg-sky-900 text-white" : "text-gray-400"
      }`}
    >
      {value}
    </div>
  );
};

export default function Page() {
  const [arrayNumber, setArrayNumber] = React.useState(
    arrayShuffle(Array.from({ length: 90 }, (_, i) => i + 1))
  );
  const [result, setResult] = React.useState<number[]>([]);
  const [value, setValue] = React.useState(0);

  const handleClick = () => {
    if (arrayNumber.length > 0) {
      const randomValue = getRandomNumber(0, arrayNumber.length - 1);
      const newArray = [...arrayNumber];
      setValue(newArray[randomValue]);
      setResult((prev) => [...prev, arrayNumber[randomValue]]);
      newArray.splice(randomValue, 1);
      setArrayNumber(arrayShuffle(newArray));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-md flex flex-col items-center space-y-4 w-full p-2">
        <h1 className="shadow-sm w-full rounded-2xl text-sky-900 flex justify-center items-center border text-9xl font-bold">
          {value}
        </h1>
        <div className="grid shadow-sm border p-2 rounded-2xl grid-cols-10 w-full gap-0.5">
          {Array.from({ length: 90 }, (_, i) => i + 1).map((number) => (
            <CellResult
              key={number}
              value={number}
              isChecked={result.includes(number)}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 inset-x-0 flex justify-center">
        <div className="max-w-md w-full px-2 py-4 border rounded-t-2xl flex justify-center">
          <button
            onClick={handleClick}
            className="px-4 h-12 w-24 flex font-medium items-center justify-center rounded-2xl bg-sky-900 text-white border shadow-sm"
          >
            Bốc
          </button>
        </div>
      </div>
    </div>
  );
}
