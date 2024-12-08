import React, { useContext } from "react";
import Button from "../ui/button";
import Logo from "../logo";
import PlayerContext from "@/context/PlayerContext";

export default function RegisterPopup() {
  const [player, setPlayer] = useContext(PlayerContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nickname = e.currentTarget.nickname.value;
    setPlayer({ name: nickname, tickets: [] });
    localStorage.setItem(
      "player",
      JSON.stringify({ name: nickname, tickets: [] })
    );
  };

  if (player?.name) return null;
  return (
    <div className="fixed z-40 bg-gray-900/70 inset-0 flex justify-center items-center">
      <div className="bg-white p-4 mx-4 max-w-md w-full border shadow-sm rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h3 className="text-center font-semibold text-base text-sky-900">
            Tham gia <Logo /> ngay
          </h3>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            name="nickname"
            className="bg-gray-100 font-semibold rounded-lg h-10 px-2 border focus:outline-none focus:ring-2 focus:ring-sky-900"
          />
          <Button type="submit" className="bg-sky-900">
            Tham gia
          </Button>
        </form>
      </div>
    </div>
  );
}
