import { getChartMax, getChartMin } from './chart_util'

export default function createChart(chartDataArray){

  let chartMax = getChartMax(chartDataArray)
  let chartMin = getChartMin(chartDataArray)

  

  const container = d3
    .select("#second")
    .style('border', '1px solid blue')

  let containerSize = document.getElementById("second")
  console.log(containerSize.width.baseVal.value)

  const xScale = d3
    .scaleBand()
    .domain(chartDataArray.map((dataPoint) => dataPoint.t))
    .rangeRound([20, containerSize.width.baseVal.value])
    .padding(0.1)

  const yScale = d3
    .scaleLinear()
    .domain([0, chartMax-chartMin])
    .range([0, containerSize.height.baseVal.value]);

  const yAxisScale = d3
    .scaleLinear()
    .domain([chartMin, chartMax])
    .range([containerSize.height.baseVal.value, 0]);

  const wicks = container
    .selectAll('.wick')
    .data(chartDataArray)
    .enter()
    .append('rect')
    .classed('wick', true)
    .style('fill', data =>{
      if (data.o > data.c){
        return 'red'
      } else{
        return 'green'
      }
    })
    .attr('width', 1)
    .attr('height', data => yScale(data.h - data.l))
    .attr('x', data => xScale(data.t) + 3)
    .attr('y', data => yScale(chartMax - data.h))

  const bodies = container
    .selectAll('.body')
    .data(chartDataArray)
    .enter()
    .append('rect')
    .classed('body', true)
    .style('fill', data =>{
      if (data.o > data.c){
        return 'red'
      } else{
        return 'green'
      }
    })
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
      if (data.o > data.c){
        return yScale(chartMax - data.o)
      } else {
        return yScale(chartMax - data.c)
      }
      
    })

    const x_axis = d3.axisBottom().scale(xScale).ticks(1)

    const y_axis = d3.axisLeft().scale(yAxisScale)

    // container.append("g")
    //   .call(x_axis)

    container.append("g")
      .attr("transform", "translate(25,0)")//magic number, change it at will
      .call(y_axis)

}



