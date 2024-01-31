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
      <DropDown buttonLabel={player.name}>
        <div className="p-2">
          <Button color="danger" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </DropDown>
    </>
  );
}
