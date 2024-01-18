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
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
let socket: undefined | Socket;

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

const Tab = ({
  id,
  title,
  value,
}: {
  id?: string;
  value: number;
  title: string;
}) => {
  // const [currentLotto, setCurrentLotto] = useContext(LottoContext);
  const [currentTab, setCurrentTab] = useContext(TabContext);
  return (
    <div className="flex justify-center w-full">
      <input
        name="type"
        type="radio"
        className="hidden peer"
        id={id}
        onChange={() => setCurrentTab(value)}
        checked={value === currentTab}
      />
      <label
        htmlFor={id}
        className="w-full h-8 items-center font-semibold flex justify-center rounded-lg peer-checked:bg-white peer-checked:shadow-sm"
      >
        {title}
      </label>
    </div>
  );
};

const ResultTable = memo(function ResultTable({
  result,
  handleReset,
}: {
  result: number[];
  handleReset: () => void;
}) {
  return (
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
                  <LottoTablePlayer ticketId={ticketId} />
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

const ListFriend = memo(function ListFriend({ player }: { player: Player[] }) {
  return (
    <div>
      {player.length > 0 ? (
        <ul className="flex flex-col p-2 border shadow-sm rounded-2xl space-y-2">
          <h2 className="font-semibold text-sky-900">Người chơi đang tham gia</h2>
          <hr />
          {player.map((p, index) => (
            <li
              className="py-2 flex items-center gap-2 px-4 border shadow-sm rounded-2xl"
              key={index}
            >
              <div className="text-sky-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-sky-900">{p.name}</p>
                <p>{p.tickets.length} vé</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-80 flex flex-col justify-center items-center">
          <p className="text-sky-900 font-semibold">Chưa có ai tham gia</p>
          <p className="text-gray-400">Hãy mời bạn bè của bạn để cùng chơi</p>
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
  const [friend, setFriend] = React.useState<Player[]>([]);

  const [currentTab, setCurrentTab] = React.useState<number>(0);

  useEffect(() => {
    fetch("/api/socket");
    socket = io();

    // socket.on("connect", () => {
    //   console.log("connected");
    // });

    function playerJoin(data: Player) {
      setFriend((prev) => {
        if (prev.find((p) => p.name === data.name)) {
          return prev;
        }
        return [...prev, data];
      });
    }

    socket.on("join", playerJoin);
  }, [friend]);

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

  const page = React.useMemo(() => {
    return [
      <ResultTable key={0} result={result} handleReset={handleReset} />,
      <ListFriend key={1} player={friend} />,
      <TicketTable key={2} />,
    ];
  }, [friend, handleReset, result]);

  return (
    <TabContext.Provider value={[currentTab, setCurrentTab]}>
      <div className="flex justify-center">
        <div className="max-w-md flex flex-col items-center space-y-2 w-full mb-20">
          <div className="p-2 w-full sticky space-y-2 z-40 border-b shadow-sm top-16 bg-white">
            <div className="rounded-2xl flex justify-center items-center border">
              <h1 className="text-8xl font-black text-sky-900">{value}</h1>
            </div>

            <div className="flex justify-between w-full bg-gray-200 rounded-lg p-0.5">
              <Tab title="Kết quả" id="type-1" value={0} />
              <Tab title={`Bạn bè (${friend.length})`} id="type-2" value={1} />
              <Tab title="Vé của bạn" id="type-3" value={2} />
            </div>
          </div>

          <div className="px-2 flex flex-col w-full gap-2">
            {page[currentTab]}
          </div>
        </div>
        <GetNumberButton handleClick={handleClick} />
      </div>
    </TabContext.Provider>
  );
}
