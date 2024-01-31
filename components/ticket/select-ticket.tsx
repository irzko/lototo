"use client";
import LottoContext from "@/context/LottoContext";
import { colorBase } from "@/lib/schemeColor";
import React, { memo, useContext } from "react";
import { tv } from "tailwind-variants";

const colorItem = tv({
  extend: colorBase,
  base: "w-5 h-5 flex justify-center items-center rounded-full border-2 border-purple-800 peer-checked:w-8 peer-checked:h-8 transition",
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
        className="w-full h-8 items-center font-semibold flex justify-center rounded-md peer-checked:bg-purple-200 peer-checked:shadow-sm"
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
        className={`shadow-sm w-full bg-purple-300 border-2 p-1 rounded-2xl border-purple-800`}
      >
        <div className="bg-purple-200 p-1 rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-around gap-2">
            {colors.map((color) => (
              <ColorItem key={color} id={color} color={color} />
            ))}
          </div>
          <div className="flex justify-between bg-purple-400 rounded-lg p-0.5">
            <TabType title="#1" id="type-1" value="1" />
            <TabType title="#2" id="type-2" value="2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SelectTicket);
