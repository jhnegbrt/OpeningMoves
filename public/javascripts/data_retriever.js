

async function query(queryString, from, to){

  let token = "c23h2raad3ieeb1lcqf0"
  let query = queryString.concat(`&from=${from}&to=${to}&token=${token}`)
  let response = await axios.get(`/search?${query}`)
  .then((response) => {
    return(response.data)
  })
  .catch(error => {
    return(error) 
  })
  return response
}

async function queryHelper(queryString, from, to, times){
  let results = {}
  for(let i = 0; i < times; i++){
    let queryResult = await query(queryString, from, to, )
    debugger
    for (const key in queryResult){
      if (i === 0){
        results[key] = queryResult[key]
      } else {
        results[key] = results[key].concat(queryResult[key])
      }
    }
    to = String(parseInt(to) - 2505600)
    from = String(parseInt(from)) - 2505600
  }
  return results
}

export default async function retrieveData(ticker, dataRange) {
    
    let symbol = ticker
    let resolution = "5"
    let to = String(Math.floor(Date.now() / 1000))
    let from = String(Math.floor(Date.now() / 1000) - 2505600)
    let queryString = `symbol=${symbol}&resolution=${resolution}`

    if (dataRange === "3m"){
      return queryHelper(queryString, from, to, 3)
    } else if (dataRange === "6m"){
      return queryHelper(queryString, from, to, 6)
    } else if (dataRange === "1y"){
      return queryHelper(queryString, from, to, 12)
    }    
  
}

