export function filterData(candles, percentChange, timeFrame){

  let mornings = createMornings(candles, timeFrame)
  let volatileMornings = selectVolatileMornings(percentChange, mornings)
  return {mornings, volatileMornings}

}

function selectVolatileMornings(percentChange, mornings){
  let volatileMornings = {}
  for (let date in mornings){
    let candle = mornings[date]
    if (((candle.high - candle.low) / candle.open) * 100 > percentChange){
      volatileMornings[date] = candle
    }
  }
  return volatileMornings
}

function checkTime(hours, minutes, timeFrame){
  if (hours === 9 && minutes >= 35 && minutes < (35 + timeFrame * 5)){
    return true
  } else if (timeFrame === 6){
    if (hours === 10 && minutes === 0){
      return true
    }
  }
}

function createMornings(candles, timeFrame){
  //returns an object of obects with keys of dates, which points to a hash
  //containing open, high, and low (open === price @ 9:30, high/low === highest/lowest
  // within morning timeFrame)
  let mornings = {}
  
  for (let i = 0; i < candles.length; i++){
    let hours = candles[i].time.slice(11, 13)
    hours = parseInt(hours)
    let minutes = candles[i].time.slice(14, 16)
    minutes = parseInt(minutes)
    if (checkTime(hours, minutes, timeFrame) === true){
      let dateString = candles[i].time.slice(0, 10)
      if(mornings[dateString] !== undefined){
        if (mornings[dateString].high < candles[i].high){
          mornings[dateString].high = candles[i].high
        } else if (mornings[dateString].low > candles[i].low){
          mornings[dateString].low = candles[i].low
        }
      } else {
        mornings[dateString] = candles[i]
      }
    }
  }
  return mornings
}
