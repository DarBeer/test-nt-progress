import React, {createContext, useCallback, useContext, useEffect, useState,} from "react";
import {CurrenciesType, TradingContextType, ExchangeHistoryType} from "../../types";
import {CurrenciesNames, Side} from "../../constants";
import moment from "moment";

export const tradingContext = createContext<TradingContextType>({} as TradingContextType);
export const useTrading = (): TradingContextType => useContext(tradingContext);

type TradingProviderProps = {
  children: React.ReactNode | undefined
}

function generateNewCurrencies(): CurrenciesType[] {
  return Object.values(CurrenciesNames).map((currencyName: CurrenciesNames) => {
    const sell: number = Math.round(Math.random() * 100 * 10000) / 10000;
    const buy: number = Math.round((sell + sell * 0.0005) * 10000) / 10000;
    return ({ name: currencyName, values: { buy, sell } });
  });
}

export const TradingProvider = ({children}: TradingProviderProps) => {
  const [currencies, setCurrencies] = useState<CurrenciesType[]>(generateNewCurrencies());
  const [exchangeHistory, setExchangeHistory] = useState<ExchangeHistoryType[]>([]);

  const generateCurrencies = useCallback(() => setCurrencies(() => {
    return generateNewCurrencies();
  }), []);

  const exchangeCurrency = useCallback((side: Side, instrument: string, volume: number, price: number) => {
    const newHistoryItem: ExchangeHistoryType = {
      timestamp: moment().unix(),
      instrument,
      price,
      side,
      volume
    }
    setExchangeHistory(prevState => prevState.concat([newHistoryItem]));
  }, []);

  useEffect(() => {
    const clockTimerId = setInterval(generateCurrencies, Math.round(Math.random() * 100) * 1000);
    return function cleanup() {
      clearInterval(clockTimerId);
    }
  }, [generateCurrencies]);

  const values: TradingContextType = {
    currencies,
    setCurrencies,
    exchangeCurrency,
    exchangeHistory
  }
  return (<tradingContext.Provider value={values} children={children} />)
}