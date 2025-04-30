export const isDateMatch = (isoDate: string, simpleDate: string) => {
  let isoFormatted = new Date(isoDate).toISOString().split('T')[0]
  return isoFormatted === simpleDate
}
