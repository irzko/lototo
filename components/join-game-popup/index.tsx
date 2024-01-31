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
    <div className="fixed z-40 bg-white-400/80 backdrop-blur-sm inset-0 flex justify-center items-center">
      <div className="bg-purple-300 border-2 p-1 overflow-hidden mx-4 max-w-md w-full border-purple-800 shadow-sm rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col rounded-xl p-2 bg-purple-200 space-y-4">
          <h3 className="text-center font-semibold text-base text-purple-900">
            Tham gia <Logo /> ngay
          </h3>
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            name="nickname"
            className="border-2 font-semibold rounded-lg h-12 px-2 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <Button type="submit">
            Tham gia
          </Button>
        </form>
      </div>
    </div>
  );
}
