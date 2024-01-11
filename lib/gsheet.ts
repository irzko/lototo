import { parse } from "csv-parse";

export const getSheet = async <T>({
  spreadsheetId,
  sheetId,
  columns = false,
  cache = "force-cache",
}: {
  spreadsheetId: string;
  sheetId: string;
  columns?: boolean;
  cache?: RequestCache;
}): Promise<T> => {
  try {
    const res = await fetch(
      `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}&gid=${sheetId}`,
      { cache }
    );

    if (!res.ok) {
      throw new Error(
        `Lỗi khi tải dữ liệu từ Google Sheets: ${res.status} - ${res.statusText}`
      );
    }

    const csvData = await res.text();
    return new Promise((resolve, reject) => {
      parse(csvData, { columns }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } catch (error) {
    throw new Error(`Lỗi khi tải dữ liệu`);
  }
};
