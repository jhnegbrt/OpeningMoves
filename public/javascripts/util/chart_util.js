export default function getDailyVar(chartArray, x){

  let price;
  for (let i = 0; i < chartArray.length; i++){
    if(price === undefined){
      price = chartArray[i][x]
    } else if (chartArray[i][x] < price && x ==="low"){
      price = chartArray[i][x]
    } else if (chartArray[i][x] > price && x === "high"){
      price = chartArray[i][x]
    }
  }
  return parseFloat(price)
}

// export default function getChartMinMax(chartArray){

//   let min = parseFloat(getDailyVar(chartArray, "low"))
//   let max = parseFloat(getDailyVar(chartArray, "high"))

//   let dailyRange = max - min
//   debugger
//   return [max + dailyRange * .6, min - dailyRange * .6]

// }