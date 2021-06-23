
function validTime(time){
  let hours = parseInt(time.slice(0, 2))
  let minutes = parseInt(time.slice(3, 5))
  if (hours === 9 && minutes >= 35){
    return true
  } else if (hours > 9 && hours < 16){
    return true
  } else if (hours === 16 && minutes === 0){
    return true
  } else {
    return false
  }
}

export default function generateChartData(mornings, data){

  // this method takes in the data object which is an array of all
  // the candles (candles are objects)

  //mornings is an object of dates as keys, and object of
  //time, open, high, low representing aggregations over timeframe

  let charts = {}
  for (let i = data.length - 1; i >= 0; i--){
    let date = data[i].time.slice(0, 10)
    let time = data[i].time.slice(11, 16)
    if (mornings[date]){
      if (validTime(time)){
        if (charts[date]){
          charts[date].push(data[i])
        } else{
          charts[date] = [data[i]]
        }
      }
    }
  }
  return charts
}

