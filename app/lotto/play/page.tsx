"use client";
import TicketContext from "@/context/TicketContext";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Link from "next/link";
import LottoTablePlayer from "@/components/ticket/lotto-table-player";

export default function Page() {
  const [selectedTickets] = useContext(TicketContext);

  if (selectedTickets.length === 0) {
    return (
      <div>
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="flex justify-center flex-col gap-2 items-center">
            <p>Chưa có vé nào</p>
            <Link
              className="border font-semibold shadow-sm py-2 px-4 rounded-full"
              href="/lotto/ticket"
            >
              Chọn vé
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-md w-full p-2">
        <Swiper
          slidesPerView={1}
          modules={[Pagination]}
          spaceBetween={16}
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
    </div>
  );
}
