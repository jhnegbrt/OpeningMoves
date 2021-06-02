function getDailyMax(chartArray){

  let maxPrice = 0
  for (let i = 0; i < chartArray.length; i++){
    if(chartArray[i]["h"] > maxPrice){
      maxPrice = chartArray[i]["h"]
    }
  }

  return maxPrice
}

function getDailyMin(chartArray){

  let minPrice;
  for (let i = 0; i < chartArray.length; i++){
    if(minPrice === undefined || chartArray[i]["l"] < minPrice){
      minPrice = chartArray[i]["l"]
    }
  }
  return minPrice

}

export default function getChartMinMAx(chartArray){

  let min = getDailyMin(chartArray)
  let max = getDailyMax(chartArray)

  let dailyRange = max - min

  return [max + dailyRange * .6, min - dailyRange * .6]




}