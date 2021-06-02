export default function generateChartData(selectedCandles, allCandles){

  let charts = []
  for (let i = 0; i < selectedCandles.length; i++){
    let chart = {}
    let candleInt = parseInt(selectedCandles[i])
    for(let j = candleInt; j < candleInt + 23400; j += 300){
      let candleString = j.toString()
      if (allCandles[candleString] !== undefined){
        chart[candleString] = allCandles[candleString]
      } else {
        let priorCandle = parseInt(candleString)-300;
        let followingCandle = parseInt(candleString) + 300;
        while (allCandles[priorCandle] === undefined){
          priorCandle -= 300
        }
        while (allCandles[followingCandle] === undefined){
          followingCandle += 300
        }
        priorCandle = allCandles[priorCandle]
        followingCandle = allCandles[followingCandle]
        let fillCandle = {
          c: ((priorCandle.c + followingCandle.c) / 2),
          h: ((priorCandle.h + followingCandle.h) / 2),
          l: ((priorCandle.l + followingCandle.l) / 2),
          o: ((priorCandle.o + followingCandle.o) / 2),
          t: j,
          flag: true
        }
        chart[candleString] = fillCandle
      }
    }
    charts.push(chart)
  }
  return charts
}