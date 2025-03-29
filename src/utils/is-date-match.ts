export const isDateMatch = (isoDate: string, simpleDate: string) => {
  // Перетворює ISO-дату в формат YYYY-MM-DD
  let isoFormatted = new Date(isoDate).toISOString().split("T")[0];
  return isoFormatted === simpleDate;
};
