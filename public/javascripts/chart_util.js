export function getChartMax(chartArray){

  let maxPrice = 0
  for (let i = 0; i < chartArray.length; i++){
    if(chartArray[i]["h"] > maxPrice){
      maxPrice = chartArray[i]["h"]
    }
  }

  return Math.floor(Math.floor(maxPrice) * 1.1)
}

export function getChartMin(chartArray){

  let minPrice;
  for (let i = 0; i < chartArray.length; i++){
    if(minPrice === undefined || chartArray[i]["l"] < minPrice){
      minPrice = chartArray[i]["l"]
    }
  }
  return Math.floor(Math.floor(minPrice) * .9)

}