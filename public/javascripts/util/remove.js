export function removeCharts(){
  d3.select("#second").selectAll('.body').remove()
  d3.select("#second").selectAll('.wick').remove()
  d3.select("#second").selectAll('g').remove()
  d3.select("#second").selectAll('text').remove()
}


export function removeOverview(){
  let overview = document.getElementsByClassName("charts-overview")
  if (overview.length > 0){
    overview[0].parentElement.removeChild(overview[0])  
  } 
}