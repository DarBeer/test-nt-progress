import React from "react";
import {ExchangeHistoryType} from "../../types";
import moment from "moment";

type HistoryItemComponentProps = {
  data: ExchangeHistoryType
}

export function HistoryItemComponent({ data }: HistoryItemComponentProps) {
  return (
    <tr>
      <td className={`table-item__side__${data.side}`}>
        {data.side}
      </td>
      <td>
        {data.price}
      </td>
      <td>
        {data.instrument.toUpperCase()}
      </td>
      <td>
        {data.volume}
      </td>
      <td>
        { moment(data.timestamp).format("YYYY.MM.DD hh:mm:ss.SSS") }
      </td>
    </tr>
  )
}