const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {

    let symbol = "TSLA"
    let resolution = "60"
    let from = "1587176882"
    let to = "1619465282"
    let token = "c23h2raad3ieeb1lcqf0"
    
    let query = `symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${token}`
    axios.get(`/search?${query}`)
    .then((response) => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    
})