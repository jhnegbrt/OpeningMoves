import { getChartMax, getChartMin } from './chart_util'

export default function createChart(chartDataArray){

  debugger

  let chartMax = getChartMax(chartDataArray)
  let chartMin = getChartMin(chartDataArray)

  const xScale = d3
    .scaleBand()
    .domain(chartDataArray.map((dataPoint) => dataPoint.t))
    .rangeRound([0, 500])
    .padding(0.1)

  const yScale = d3
    .scaleLinear()
    .domain([0, chartMax-chartMin])
    .range([0, 300]);

  const container = d3
    .select("second")
    .style('border', '1px solid blue')
    .classed('container', true)

  const candles = container
    .selectAll('.candle')
    .data(chartDataArray)
    .enter()
    .append('rect')
    .classed('candle', true)
    .style('fill', 'red')
    .attr('width', xScale.bandwidth())
    .attr('height', data => yScale(data.h - data.l))
    .attr('x', data => xScale(data.t))
    .attr('y', data => yScale(chartMax - data.h))

}



