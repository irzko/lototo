"use client";
import arrayShuffle from "@/lib/arrayShuffle";
import getRandomNumber from "@/lib/getRandomNumber";
import React, { memo, useCallback, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";
import Link from "next/link";
import Button from "@/components/ui/button";
import PlayerContext from "@/context/PlayerContext";
import findTicketById from "@/lib/findTicketById";

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

const TabContext = React.createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([1, () => {}]);

const ResultTable = memo(function ResultTable({
  result,
  handleReset,
}: {
  result: number[];
  handleReset: () => void;
}) {
  return (
    <div className="shadow-sm border rounded-2xl w-full space-y-2 p-2">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sky-900">Kết quả</h3>
        <button
          onClick={handleReset}
          className="bg-sky-900 text-white font-semibold rounded-full px-2 py-1"
        >
          Đặt lại
        </button>
      </div>
      <hr />
      <div className="grid grid-cols-10 w-full gap-0.5">
        {Array.from({ length: 90 }, (_, i) => i + 1).map((number) => (
          <CellResult
            key={number}
            value={number}
            isChecked={result.includes(number)}
          />
        ))}
      </div>
    </div>
  );
});

const GetNumberButton = memo(function GetNumberButton({
  handleClick,
}: {
  handleClick: () => void;
}) {
  return (
    <div className="fixed bottom-0 z-40 h-16 bg-white inset-x-0 flex justify-center">
      <div className="max-w-md w-full px-2 h-full items-center border rounded-t-2xl flex justify-center">
        <Button className="bg-sky-900 w-32" onClick={handleClick}>
          Bốc
        </Button>
      </div>
    </div>
  );
});

const TicketTable = memo(function TicketTable() {
  const [player] = useContext(PlayerContext);

  return (
    <div className="w-full">
      {player.tickets.length > 0 ? (
        <div className="w-full">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            modules={[Pagination]}
            pagination={{
              dynamicBullets: true,
            }}
          >
            {player.tickets.map((ticketId) => (
              <SwiperSlide key={ticketId}>
                <div className="mb-8">
                  <LottoTablePlayer ticket={findTicketById(ticketId)!} />
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
            className="shadow-sm border font-semibold rounded-full px-4 py-2"
          >
            Thêm
          </Link>
        </div>
      )}
    </div>
  );
});

export default function Page() {
  const [arrayNumber, setArrayNumber] = React.useState(
    arrayShuffle(Array.from({ length: 90 }, (_, i) => i + 1))
  );
  const [result, setResult] = React.useState<number[]>([]);
  const [value, setValue] = React.useState(0);

  const [currentTab, setCurrentTab] = React.useState<number>(0);

  const handleClick = useCallback(() => {
    if (arrayNumber.length > 0) {
      const randomValue = getRandomNumber(0, arrayNumber.length - 1);
      const newArray = [...arrayNumber];
      setValue(newArray[randomValue]);
      setResult((prev) => [...prev, arrayNumber[randomValue]]);
      newArray.splice(randomValue, 1);
      setArrayNumber(arrayShuffle(newArray));
    }
  }, [arrayNumber]);

  const handleReset = useCallback(() => {
    setArrayNumber(arrayShuffle(Array.from({ length: 90 }, (_, i) => i + 1)));
    setResult([]);
    setValue(0);
  }, []);

  return (
    <TabContext.Provider value={[currentTab, setCurrentTab]}>
      <div className="flex justify-center">
        <div className="max-w-md flex flex-col items-center space-y-2 w-full mb-20">
          <div className="p-2 w-full sticky space-y-2 z-40 border-b shadow-sm top-16 bg-white">
            <div className="rounded-2xl flex justify-center items-center border">
              <h1 className="text-9xl font-black text-sky-900">{value}</h1>
            </div>
          </div>
          <div className="px-2 flex flex-col w-full gap-2">
            <ResultTable key={0} result={result} handleReset={handleReset} />
            <hr />
            <TicketTable key={1} />
          </div>
        </div>
        <GetNumberButton handleClick={handleClick} />
      </div>
    </TabContext.Provider>
  );
}
