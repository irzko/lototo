"use client";
import TicketContext from "@/context/TicketContext";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";

export default function Page() {
  const [selectedTickets] = useContext(TicketContext);

  if (selectedTickets.length === 0) {
    return (
      <div>
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="flex justify-center flex-col items-center">
            <p>Chưa có vé nào</p>
            <Link className="border py-2 px-4 rounded-lg" href="/lotto/ticket">
              Chọn vé
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`w-full p-2 flex flex-col justify-center space-y-4 items-center`}
      ></div>
      <Swiper
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {selectedTickets.map((ticket, index) => (
          <SwiperSlide key={index}>
            <div className="p-2">
              <LottoTablePlayer ticket={ticket} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
