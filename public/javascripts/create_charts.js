export default function createCharts(selectedCandles, allCandles){

  let charts = []
  for (const candle in selectedCandles){
    let chart = {}
    let candleInt = parseInt(candle)
    for(let i = candleInt; i < candleInt + 23400; i += 300){
      let candleString = i.toString()
      if (allCandles[candleString] !== undefined){
        chart[candleString] = allCandles[candleString]
      } 
    }
    charts.push(chart)
  }

  return charts
}