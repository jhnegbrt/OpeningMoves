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


function selectOpeningCandles(candles, timeFrame){
  let openingCandles = {}
  for(const candle in candles){
    let date = new Date(candle * 1000)
    debugger
    let convertedTime = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"})
    let minutes = parseInt(convertedTime.slice(-8,-6))
    if (convertedTime.slice(-2) === "AM" && parseInt(convertedTime) === 9 && 55 >= minutes && miunutes >= 30){
      openingCandles[candle] = candles[candle]
    }
  }
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

