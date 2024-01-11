import { getSheet } from "@/lib/gsheet";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const data = await getSheet<{ gid: string; color: string }[]>({
    spreadsheetId: process.env.SPREAD_SHEET_ID!,
    sheetId: "0",
    columns: true,
    cache: "no-store",
  });
  const lotto: { id: number; color: string; map: string[][] }[] = [];

  let id = 1;
  for (const i of data) {
    const d = await getSheet<string[][]>({
      spreadsheetId: process.env.SPREAD_SHEET_ID!,
      sheetId: i.gid,
    });
    lotto.push({ id, color: i.color, map: d });
    id++;
  }

  console.log(lotto);

  return NextResponse.json(
    { message: "success", data: lotto },
    { status: 200 }
  );
};
