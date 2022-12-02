import React, {useEffect, useState} from "react";
import moment from "moment";

export function Clock() {
  const [decoratedTime, setDecoratedTime] = useState<string>(moment().format("hh:mm:ss"));

  function refreshClock() {
    setDecoratedTime(moment().format("hh:mm:ss"))
  }

  useEffect(() => {
    const clockTimerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(clockTimerId);
    }
  }, [])

  return (
    <h3 className="trading__clock">{decoratedTime}</h3>
  )
}