import { getChartMax, getChartMin } from './chart_util'

export default function createChart(chartDataArray){

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
    .select("#second")
    .style('border', '1px solid blue')
    .classed('container', true)

  const wicks = container
    .selectAll('.wick')
    .data(chartDataArray)
    .enter()
    .append('rect')
    .classed('wick', true)
    .style('fill', 'black')
    .attr('width', 2)
    .attr('height', data => yScale(data.h - data.l))
    .attr('x', data => xScale(data.t) + 2)
    .attr('y', data => yScale(chartMax - data.h))

  const bodies = container
    .selectAll('.body')
    .data(chartDataArray)
    .enter()
    .append('rect')
    .classed('body', true)
    .style('fill', 'red')
    .attr('width', xScale.bandwidth())
    .attr('height', data => {
      if (data.o > data.c){
        return yScale(data.o - data.c)
      } else{
        return yScale(data.c-data.o)
      }
    })
    .attr('x', data => xScale(data.t))
    .attr('y', data => {
      debugger
      if (data.o > data.c){
        return yScale(chartMax - data.o)
      } else {
        return yScale(chartMax - data.c)
      }
      
    })
}



