import {CurrenciesNames} from "../constants";

export type CurrenciesType = {
  name: CurrenciesNames,
  values: {
    buy: number,
    sell: number
  }
}