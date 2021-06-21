import getDailyVar from './util/chart_util'
import {removeOverview, removeInstructions} from "./util/remove"


export default function createChart(chartDataArray, ticker){

  if (chartDataArray.length !== 0){
    renderCharts(chartDataArray, ticker)
  } else {
    renderNoCharts(ticker)
  }
      
}

function renderNoCharts(ticker){

  let chartContainer = document.getElementById("chart-container")
  let display = document.createElement("div")
  let displayText = document.createTextNode(`No results for ${ticker} given current input!`)
  display.appendChild(displayText)
  display.classList.add("no-chart-display")
  chartContainer.appendChild(display)

}

function renderCharts(chartDataArray, ticker){

  let chartMax = getDailyVar(chartDataArray, "high")
  let chartMin = getDailyVar(chartDataArray, "low")
  let dailyRange = chartMax-chartMin
  chartMax = chartMax + dailyRange * .6
  chartMin = chartMin - dailyRange * .6

  removeInstructions()
  removeOverview()
  d3.select("#second").selectAll('.body').remove()
  d3.select("#second").selectAll('.wick').remove()
  d3.select("#second").selectAll('g').remove()
  if(ticker){
    d3.select("#second").selectAll('text').remove()
  }

  let containerSize = document.getElementById("second")

  let margin = {
    top: containerSize.height.baseVal.value/15, 
    right: containerSize.width.baseVal.value/30, 
    bottom: containerSize.height.baseVal.value/25, 
    left: containerSize.width.baseVal.value/24
  }

  const container = d3
    .select("#second")

  const xScale = d3
    .scaleBand()
    .domain(chartDataArray.map((dataPoint) => dataPoint.time))
    .rangeRound([margin.left, containerSize.width.baseVal.value])
    .padding(0.16)

  const yScale = d3
    .scaleLinear()
    .domain([0, chartMax-chartMin])
    .range([margin.bottom, containerSize.height.baseVal.value - margin.top]);

  const yAxisScale = d3
    .scaleLinear()
    .domain([chartMin, chartMax])
    // .range([containerSize.height.baseVal.value - margin.top + 1, margin.bottom - 1]);
    .range([containerSize.height.baseVal.value - margin.top, margin.bottom]);

  const wicks = container
    .selectAll('.wick')
    .data(chartDataArray)
    .enter()
    .append('rect')
    .classed('wick', true)
    .style('fill', data =>{
      if (data.open > data.close){
        return 'red'
      } else{
        return 'green'
      }
    })
    .attr('width', 1)
    .attr('height', data => yScale(data.high - data.low) - margin.bottom)
    .attr('x', data => xScale(data.time) + 3)
    .attr('y', data => yScale(chartMax - data.high))

  const bodies = container
    .selectAll('.body')
    .data(chartDataArray)
    .enter()
    .append('rect')
    .classed('body', true)
    .style('fill', data =>{
      if (data.flag === true){
        return 'yellow'
      } else if (data.open > data.close){
        return 'red'
      } else{
        return 'green'
      }
    })
    .attr('width', xScale.bandwidth())
    .attr('height', data => {
      if (data.open > data.close){
        return yScale(data.open - data.close) - margin.bottom
      } else{
        return yScale(data.close - data.open) - margin.bottom
      }
    })
    .attr('x', data => xScale(data.time))
    .attr('y', data => {
      if (data.open > data.close){
        return yScale(chartMax - data.open)
      } else {
        return yScale(chartMax - data.close)
      }
      
    })

    const x_axis = d3.axisBottom()
      .scale(xScale)
      .tickValues(xScale.domain().filter(function(date, i){
        return i % 6 === 0
      }))
      .tickFormat((date) =>{
        debugger
        let time = date.slice(11, 15).concat(0)
        let hours = time.slice(0, 2)
        if (hours > 12){
          return (hours - 12).toString().concat(time.slice(2, 6)).concat(" PM")
        } else if(hours === 12) {
          return time.concat(" PM")
        } else if (hours === "09"){
          return time.slice(1, 5).concat(" AM")
        } else {
          return time.concat(" AM")
        }
        // let date = new Date(d * 1000 + 10800000)
        // let minutes;
        // let hours;
        // date.getMinutes() === 0 ? minutes = "00" : ""

        // parseInt(date.getHours()) > 12 ? hours = parseInt(date.getHours() - 12) : undefined
        // let amPm = date.getHours() < 12 ? "AM" : "PM"
        // return (hours ? String(hours) : date.getHours()) + ":" + (minutes || date.getMinutes()) + ` ${amPm}`
      })
      
      

    const y_axis = d3.axisLeft().scale(yAxisScale)

    let height = containerSize.height.baseVal.value - margin.top

    container.append("g")
      .attr("transform", "translate(0," + height +")")
      .call(x_axis)
      .attr("font-size", "1.5vh")
      .attr("font-family", "helvetica")
      .style('fill', 'white')
      .style('stroke', 'white')

    
    container.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")//magic number, change it at will'
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




