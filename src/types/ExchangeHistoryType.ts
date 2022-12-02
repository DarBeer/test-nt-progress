import { Side } from "../constants";

export type ExchangeHistoryType = {
  side: Side,
  price: number,
  instrument: string,
  volume: number,
  timestamp: number
}