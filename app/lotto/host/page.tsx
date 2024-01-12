"use client";
import TicketContext from "@/context/TicketContext";
import arrayShuffle from "@/lib/arrayShuffle";
import getRandomNumber from "@/lib/getRandomNumber";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";
import Link from "next/link";
import Button from "@/components/ui/button";

const CellResult = ({
  value,
  isChecked,
}: {
  value: number;
  isChecked: boolean;
}) => {
  return (
    <div
      className={`aspect-square font-semibold rounded-full flex justify-center items-center ${
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
  const [selectedTickets] = useContext(TicketContext);

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

  const handleReset = () => {
    setArrayNumber(arrayShuffle(Array.from({ length: 90 }, (_, i) => i + 1)));
    setResult([]);
    setValue(0);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-md flex flex-col items-center space-y-2 w-full mb-20">
        <div className="p-2 w-full sticky z-40 border-b shadow-sm top-16 bg-white">
          <div className="rounded-2xl flex justify-center items-center border">
            <h1 className="text-9xl font-black text-sky-900">{value}</h1>
          </div>
        </div>
        <div className="shadow-sm border rounded-2xl w-full">
          <div className="flex justify-between items-center border-b p-2">
            <h3 className="font-semibold text-sky-900">Kết quả</h3>
            <button
              onClick={handleReset}
              className="bg-sky-900 text-white font-semibold rounded-full px-2 py-1"
            >
              Đặt lại
            </button>
          </div>
          <div className="grid grid-cols-10 p-2 w-full gap-0.5">
            {Array.from({ length: 90 }, (_, i) => i + 1).map((number) => (
              <CellResult
                key={number}
                value={number}
                isChecked={result.includes(number)}
              />
            ))}
          </div>
        </div>
        <hr className="h-[1px] w-full" />
        <div className="p-2 w-full">
          {selectedTickets.length > 0 ? (
            <div className="w-full">
              <Swiper
                slidesPerView={1}
                spaceBetween={16}
                modules={[Pagination]}
                pagination={{
                  dynamicBullets: true,
                }}
              >
                {selectedTickets.map((ticket, index) => (
                  <SwiperSlide key={index}>
                    <div className="mb-8">
                      <LottoTablePlayer ticket={ticket} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 justify-center px-2 py-4 border shadow-sm w-full rounded-2xl bg-white">
              <p>Bạn có thể thêm vé để vừa gọi số vừa dò</p>
              <Link
                href="/lotto/ticket"
                className="bg-sky-900 text-white font-semibold rounded-full px-2 py-1"
              >
                Thêm
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 z-40 h-16 bg-white inset-x-0 flex justify-center">
        <div className="max-w-md w-full px-2 h-full items-center border rounded-t-2xl flex justify-center">
          <Button className="bg-sky-900" onClick={handleClick}>
            Bốc
          </Button>
        </div>
      </div>
    </div>
  );
}
