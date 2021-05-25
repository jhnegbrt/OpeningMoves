export default function generateChartData(selectedCandles, allCandles){

  let charts = []
  for (let i = 0; i < selectedCandles.length; i++){
    let chart = {}
    let candleInt = parseInt(selectedCandles[i])
    for(let j = candleInt; j < candleInt + 23400; j += 300){
      let candleString = j.toString()
      if (allCandles[candleString] !== undefined){
        chart[candleString] = allCandles[candleString]
      } 
    }
    charts.push(chart)
  }
  return charts
}