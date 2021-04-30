const axios = require('axios');

export async function renderLoadingModal(dataRange, ticker){

  let page = document.getElementById("page")
  let modalContainer = document.createElement("div")
  modalContainer.classList.add("loading-modal-container")
  let modal = document.createElement("div")
  modal.classList.add("loading-modal")
  let modalText = document.createElement("p")
  let text = document.createTextNode("Processing over 80,000 data points, thank you for waiting!")
  modalText.appendChild(text)
  modal.appendChild(modalText)
  modalContainer.appendChild(modal)
  page.appendChild(modalContainer)
  // let news = await getNews(ticker)
  // debugger
  // modal.appendChild(news)

}

export function removeLoadingModal(){

  let modal = document.getElementsByClassName("loading-modal-container")
  debugger
  modal[0].parentElement.removeChild(modal[0])

}

async function getNews(ticker){

  debugger
  let token = "c23h2raad3ieeb1lcqf0"
  let to = createDateString(Date.now())
  let from = createDateString(Date.now() - 604800)
  let query = `${ticker}&from=${from}&to=${to}&token=${token}`
  let news = await axios.get(`/news?${query}`)
  return news

}

function createDateString(unix){

  let date = new Date(unix)
  let yyyy = date.getFullYear
  let mm = ('0' + (date.getMonth() + 1)).slice(-2)
  let dd = ('0' + date.getDate()).slice(-2)
  return yyyy + "-" + mm + "-" + dd


}