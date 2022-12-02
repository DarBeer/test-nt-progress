import {CurrenciesType, ExchangeHistoryType, ReactDispatchSetStateAction} from "./.";
import {Side} from "../constants";

export type TradingContextType = {
  currencies: CurrenciesType[],
  setCurrencies: ReactDispatchSetStateAction<CurrenciesType[]>,
  exchangeHistory: ExchangeHistoryType[],
  exchangeCurrency: (side: Side, instrument: string, volume: number, price: number) => void
}