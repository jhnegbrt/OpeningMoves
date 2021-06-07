const axios = require('axios');

async function query(queryString){

  // let token = "c23h2raad3ieeb1lcqf0"
  // let query = queryString.concat(`&from=${from}&to=${to}&token=${token}`)
  // let response = await axios.get(`/search?${query}`)

  let query = 

  let response = await axios.get(`/alphaVantage`)
  .then((response) => {
    return(response.data)
  })
  .catch(error => {
    return(error) 
  })
  return response
}

async function queryHelper(queryString, times){

  let apiKey = "&apikey=53VI4OM5S9T1PSSI"
  let results = {}
  for(let i = 0; i < times; i++){
    let month = i + 1
    let year = 1
    if (i === 13){
      month = 1
      year = 2
    }
    let slice = `&slice=year${year}month${month}`
    let fullString = queryString.concat(slice).concat(apiKey)

    debugger
    let queryResult = await query(fullString)
    
    for (const key in queryResult){
      if (i === 0){
        results[key] = queryResult[key]
      } else {
        results[key] = results[key].concat(queryResult[key])
      }
    }
    // to = String(parseInt(to) - 2505600)
    // from = String(parseInt(from)) - 2505600
  }
  return results
}

export default async function retrieveData(ticker, dataRange) {
    
    let symbol = ticker
    let interval = "5min"
    // let to = String(Math.floor(Date.now() / 1000))
    // let from = String(Math.floor(Date.now() / 1000) - 2505600)
    let queryString = `&symbol=${symbol}&interval=${interval}`

    if (dataRange === "3m"){
      return queryHelper(queryString, 3)
    } else if (dataRange === "6m"){
      return queryHelper(queryString, 6)
    } else if (dataRange === "1y"){
      return queryHelper(queryString, 12)
    }    
  
}

