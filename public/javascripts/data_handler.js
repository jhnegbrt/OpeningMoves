// export function convertData(data){
//   let candles = {};
//   //put each candle together
//   for(let i = 0; i < data["c"].length; i++){
//     candles[data["t"][i]] = {
//       c: data["c"][i],
//       h: data["h"][i],
//       l: data["l"][i],
//       o: data["o"][i],
//       t: data["t"][i],
//       v: data["v"][i]
//     }
//   }
//   return candles
// }

// what do I have?

// I have an array of candles with dates

//what do I need?

//I need an array of candles with just the selected dates

export function filterData(candles, percentChange, timeFrame){

  let mornings = createMornings(candles, timeFrame)
  let volatileMornings = selectVolatileMornings(percentChange, mornings)
  // let filteredCandles = selectVolatileCandles(openingCandles, percentChange, timeFrame)
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
      console.log(candles[i])
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

function createDateString(date){
  return date.getDate() + date.getMonth() + date.getFullYear()
}


// TO BE DELETED

// function selectOpeningCandles(candles, timeFrame){
//   let openingCandles = []
//   for(const candle in candles){
//     let date = new Date(candle * 1000)
//     let convertedTime = date.toLocaleTimeString("en-US", {timeZone: "America/New_York"})
//     let minutes = parseInt(convertedTime.slice(-8,-6))
//     if (convertedTime.slice(-2) === "AM" && parseInt(convertedTime) === 9 && (30 + 5 * timeFrame) > minutes && minutes >= 30){
//       if (openingCandles.length === 0){
//         openingCandles.push([[date, candles[candle]]])
//       } else {
//         let lastCandleDate = openingCandles[openingCandles.length-1][0][0]
//         if (createDateString(lastCandleDate) === createDateString(date)){
//           openingCandles[openingCandles.length-1].push([date, candles[candle]])
//         } else {
//           openingCandles.push([[date, candles[candle]]])
//         }
//       }
//     }
//   }
//   return openingCandles
// }

function selectOpeningCandles(candles, timeFrame){

  time = candles[0].time.slice(11,16)

}

function volatileOpen(prices, percentChange){

  if((prices[1] - prices[2]) / prices[1] >= (parseFloat(percentChange) / 100)){
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
      filteredCandles.push(morning)
      // filteredCandles.push(Object.keys(morning)[0])
    }
  })

  return filteredCandles

}

