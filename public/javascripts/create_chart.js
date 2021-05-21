import { getChartMax, getChartMin } from './chart_util'

export default function createChart(chartDataArray, ticker){

  let chartMax = getChartMax(chartDataArray)
  let chartMin = getChartMin(chartDataArray)

  d3.select("#second").selectAll('.body').remove()
  d3.select("#second").selectAll('.wick').remove()
  d3.select("#second").selectAll('g').remove()
  d3.select("#second").selectAll('text').remove()

  let margin = {top: 50, right: 30, bottom: 30, left: 40}

  const container = d3
    .select("#second")
    // .style('border', '1px solid blue')

  let containerSize = document.getElementById("second")

  const xScale = d3
    .scaleBand()
    .domain(chartDataArray.map((dataPoint) => dataPoint.t))
    .rangeRound([margin.left, containerSize.width.baseVal.value - margin.right])
    .padding(0.1)

  const yScale = d3
    .scaleLinear()
    .domain([0, chartMax-chartMin])
    .range([margin.bottom, containerSize.height.baseVal.value - margin.top]);

  const yAxisScale = d3
    .scaleLinear()
    .domain([chartMin, chartMax])
    .range([containerSize.height.baseVal.value - margin.top + 1, margin.bottom - 1]);

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
    .attr('height', data => yScale(data.h - data.l) - margin.bottom)
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
        return yScale(data.o - data.c) - margin.bottom
      } else{
        return yScale(data.c-data.o) - margin.bottom
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

    const x_axis = d3.axisBottom()
      .scale(xScale)
      .tickValues(xScale.domain().filter(function(unix){
        let date = new Date(unix * 1000 + 10800000)
        return date.getMinutes() === 0 || date.getMinutes() === 30
      }))
      .tickFormat((d) =>{
        let date = new Date(d * 1000 + 10800000)
        let minutes;
        let hours;
        date.getMinutes() === 0 ? minutes = "00" : ""
        debugger

        parseInt(date.getHours()) > 12 ? hours = parseInt(date.getHours() - 12) : undefined
        let amPm = date.getHours() < 12 ? "AM" : "PM"
        return (hours ? String(hours) : date.getHours()) + ":" + (minutes || date.getMinutes()) + ` ${amPm}`
      })
      
      

    const y_axis = d3.axisLeft().scale(yAxisScale)
    // .tickSize(-200)

    let height = containerSize.height.baseVal.value - margin.top

 

    container.append("g")
      .attr("transform", "translate(0," + height +")")
      .call(x_axis)
      .attr("font-size", "1.5vh")
      .attr("font-family", "helvetica")
      .style('fill', 'white')
      .style('stroke', 'white')

    container.append("g")
      .attr("transform", "translate(40,0)")//magic number, change it at will'
      .call(y_axis)
      .attr("font-size", "1.5vh")
      .attr("font-family", "helvetica")
      .style('fill', 'white')
      .style('stroke', 'white')
    
    let xLabelHeight = containerSize.height.baseVal.value
    let xLabelWidth = containerSize.width.baseVal.value
    container.append("text")
      .attr("x", xLabelWidth/2 )
      .attr("y", xLabelHeight -5)
      .text("Time (EST)")
      .style('stroke', 'white')
    

    container.append("text")
      .attr("x", 5)
      .attr("y", margin.bottom - 8)
      .text("Price (USD)")
      .style('stroke', 'white')
      .selectAll("text")
    

    container.append("text")
      .attr("x", xLabelWidth/2)
      .attr("y", xLabelHeight /5)
      .text(ticker)
      .style('stroke', 'white')
      .attr("font-size", "10vh")
      .attr("font-family", "helvetica")
      
}



