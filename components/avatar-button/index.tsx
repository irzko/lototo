"use client";
import PlayerContext from "@/context/PlayerContext";
import React, { useContext } from "react";
import DropDown from "../ui/DropDown";
import Link from "next/link";
import Button from "../ui/button";

export default function AvatarButton() {
  const [player, setPlayer] = useContext(PlayerContext);

  const handleLogout = () => {
    setPlayer({
      name: "",
      tickets: [],
    });
    localStorage.removeItem("player");
  };
  if (!player.name) return null;
  return (
    <>
      {/* <Button className="text-sky-900 border flex gap-2 items-center">
      

      {player.name}
    </Button> */}
      <DropDown
        buttonClassName="text-sky-900 border flex items-center"
        buttonLabel={player.name}
      >
        <Link className="py-2 px-4" href="/lotto/play">
          Chơi
        </Link>
        <Button className="text-sky-900" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </DropDown>
    </>
  );
}
