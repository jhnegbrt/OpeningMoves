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
  return {selectedCandles: filteredCandles, openingCandles: openingCandles}

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
      if (openingCandles.length === 0){
        openingCandles.push([[date, candles[candle]]])
      } else {
        let lastCandleDate = openingCandles[openingCandles.length-1][0][0]
        if (createDateString(lastCandleDate) === createDateString(date)){
          openingCandles[openingCandles.length-1].push([date, candles[candle]])
        } else {
          openingCandles.push([[date, candles[candle]]])
        }
      }
    }
  }
  return openingCandles
}

function volatileOpen(prices, percentChange){
  if((prices[0] - prices[2]) / prices[0] >= (parseFloat(percentChange) / 100) || (prices[1] - prices[0]) / prices[0] >= (parseFloat(percentChange) / 100)){
    return true
  } else{
    return false
  }
  
}

function selectVolatileCandles(openingCandles, percentChange){

  let mornings = openingCandles.map(morning => {
    let high;
    let low;
    let open = morning[0][1]["o"]
    morning.forEach(candle =>{
      if (candle[1]["h"] > high || high === undefined){
        high = candle[1]["h"]
      }
      if (candle[1]["l"] < low || low === undefined){
        low = candle[1]["l"]
      }
    })
    return {[morning[0][1].t]: [open, high, low]}
  })

  let filteredCandles = []
  mornings.forEach(morning => {
    let prices = Object.values(morning)[0]
    if (volatileOpen(prices, percentChange)){
      
      return filteredCandles.push(Object.keys(morning)[0])
    }
  })

  return filteredCandles

}

