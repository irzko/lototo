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
      <div className="max-w-md flex flex-col items-center space-y-2 w-full p-2 mb-32">
        <div className="shadow-sm w-full sticky z-40 top-16 bg-white rounded-2xl flex justify-center items-center border">
          <h1 className="text-9xl font-bold text-sky-900">{value}</h1>
        </div>
        {selectedTickets.length > 0 ? (
          <div className="w-full">
            <Swiper
              slidesPerView={1}
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
      </div>
      <div className="fixed bottom-0 z-40 h-16 bg-white inset-x-0 flex justify-center">
        <div className="max-w-md w-full px-2 h-full items-center  border rounded-t-2xl flex justify-center">
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
