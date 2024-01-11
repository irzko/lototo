"use client";
import LottoContext from "@/context/LottoContext";
import React, { memo, useContext } from "react";
import { tv } from "tailwind-variants";

const colorButtonBase = tv({
  variants: {
    color: {
      blue: "bg-blue-300",
      red: "bg-red-300",
      green: "bg-green-300",
      yellow: "bg-yellow-300",
      pink: "bg-pink-300",
      purple: "bg-purple-300",
      orange: "bg-orange-300",
      lime: "bg-lime-300",
    },
  },
});

const colorItem = tv({
  extend: colorButtonBase,
  base: "w-5 h-5 flex justify-center items-center rounded-full peer-checked:border-2 peer-checked:border-gray-900 peer-checked:w-8 peer-checked:h-8 transition",
});

const ColorItem = ({ id, color }: { id?: string; color: TicketColor }) => {
  const [currentLotto, setCurrentLotto] = useContext(LottoContext);

  return (
    <div>
      <input
        name="color"
        type="radio"
        className="hidden peer"
        id={id}
        onChange={() => setCurrentLotto((prev) => ({ ...prev, color: color }))}
        checked={color === currentLotto.color}
      />
      <label htmlFor={id} className={colorItem({ color })}></label>
    </div>
  );
};

const TabType = ({
  id,
  title,
  value,
}: {
  id?: string;
  value: TicketType;
  title: string;
}) => {
  const [currentLotto, setCurrentLotto] = useContext(LottoContext);
  return (
    <div className="flex justify-center w-full">
      <input
        name="type"
        type="radio"
        className="hidden peer"
        id={id}
        onChange={() => setCurrentLotto((prev) => ({ ...prev, type: value }))}
        checked={value === currentLotto.type}
      />
      <label
        htmlFor={id}
        className="w-full h-8 items-center flex justify-center rounded-lg peer-checked:bg-white peer-checked:shadow-sm"
      >
        {title}
      </label>
    </div>
  );
};

const SelectTicket = () => {
  const colors: readonly TicketColor[] = [
    "pink",
    "red",
    "purple",
    "orange",
    "yellow",
    "green",
    "blue",
    "lime",
  ];

  return (
    <div className="w-full max-w-md justify-center">
      <div
        className={`flex flex-col shadow-sm w-full bg-white border p-2 rounded-2xl gap-2`}
      >
        <div className="flex items-center justify-around gap-2">
          {colors.map((color) => (
            <ColorItem key={color} id={color} color={color} />
          ))}
        </div>
        <div className="flex justify-between bg-gray-200 rounded-lg p-0.5">
          <TabType title="#1" id="type-1" value="1" />
          <TabType title="#2" id="type-2" value="2" />
        </div>
      </div>
    </div>
  );
};

export default memo(SelectTicket);
