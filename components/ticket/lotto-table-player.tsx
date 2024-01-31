import React, { useEffect, useState } from "react";
import NumberBox from "./number-box";
import Button from "../ui/button";

export default function LottoTablePlayer({ ticket }: { ticket: Ticket }) {
  const [boardState, setBoardState] = useState<number[][]>([]);
  useEffect(() => {
    const newBoardState: number[][] = Array.from({ length: 9 }, () =>
      Array(9).fill(-1)
    );
    ticket!.map.forEach((sheet, i) => {
      sheet.forEach((cell, j) => {
        if (cell !== "") {
          newBoardState[i][j] = 0;
        }
      });
    });
    setBoardState(newBoardState);
  }, [ticket]);

  const handleChange = (row: number, column: number) => {
    setBoardState((prev) => {
      const newBoardState = [...prev];
      newBoardState[row] = [...prev[row]];
      newBoardState[row][column] = newBoardState[row][column] === 0 ? 1 : 0;
      return newBoardState;
    });
  };

  if (boardState.length === 0) {
    return (
      <div className="fixed inset-0 font-semibold text-sky-900 flex justify-center items-center">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-md w-full space-y-4">
        <div className="flex w-full justify-end">
          <Button
            color="primary"
            size="sm"
            onClick={() => {
              const newBoardState = Array.from({ length: 9 }, () =>
                Array(9).fill(-1)
              );
              ticket!.map.forEach((sheet, i) => {
                sheet.forEach((cell, j) => {
                  if (cell !== "") {
                    newBoardState[i][j] = 0;
                  }
                });
              });
              setBoardState(newBoardState);
            }}
          >
            Đặt lại
          </Button>
        </div>
        <div className="grid grid-cols-9 gap-1">
          {ticket!.map.map((line, i) =>
            line.map((cell, j) => (
              <NumberBox
                onChange={() => handleChange(i, j)}
                key={i + "" + j}
                id={`number-box-${ticket!.id}_${i}_${j}`}
                title={cell}
                value={boardState[i][j]}
                color={ticket!.color}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
