export function convertData(data){
  let candles = {};
  //put each candle together
  for(let i = 0; i < data["c"].length; i++){
    candles[data["t"][i]] = {
      c: data["c"][i],
      h: data["h"][i],
      l: data["l"][i],
      o: data["o"][i],
      t: data["t"][i],
      v: data["v"][i]
    }
  }
  return candles
}

export function filterData(candles, percentChange, timeFrame){

  let openingCandles = selectOpeningCandles(candles, timeFrame)
  let filteredCandles = selectVolatileCandles(openingCandles, percentChange, timeFrame)
  return filteredCandles

}

function createDateString(date){
  return date.getDate() + date.getMonth() + date.getFullYear()
}


function selectOpeningCandles(candles, timeFrame){
  let openingCandles = []
  for(const candle in candles){
    let date = new Date(candle * 1000)
    let convertedTime = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"})
    let minutes = parseInt(convertedTime.slice(-8,-6))
    if (convertedTime.slice(-2) === "AM" && parseInt(convertedTime) === 9 && (30 + 5 * timeFrame) > minutes && minutes >= 30){
      debugger
      if (openingCandles.length === 0){
        openingCandles.push([[date, candles[candle]]])
      } else {
        let lastCandleDate = openingCandles[openingCandles.length-1][0][0]
        if (createDateString(lastCandleDate) === createDateString(date)){
          openingCandles[-1].push([date, candles[candle]])
        } else {
          openingCandles.push([[date, candles[candle]]])
        }
      }
    }
  }
  debugger
  return openingCandles
}

function volatileCandle(candle, percentChange){
  if((candle["o"] - candle["l"]) / candle["o"] >= (parseFloat(percentChange) / 100) || (candle["h"] - candle["o"]) / candle["o"] >= (parseFloat(percentChange) / 100)){
    return true
  } else{
    return false
  }
  
}

function selectVolatileCandles(openingCandles, percentChange){
  
  let filteredCandles = {}
  for (const candle in openingCandles){
    if(volatileCandle(openingCandles[candle], percentChange)){
      filteredCandles[candle] = openingCandles[candle]
    }
  }
  return filteredCandles
}

