import {getNews, renderNews} from '../../util/modal_utils'

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
  let news = await getNews(ticker)
  let newsBits = news.data.slice(0, 5)
  let modalInterval = renderNews(newsBits, 0)
  return modalInterval
}



export function renderModalClose(modalInterval){

  let modal = document.getElementsByClassName("loading-modal")
  let buttonContainer = document.createElement("div")
  buttonContainer.setAttribute("id", "button-container")
  let closeButton = document.createElement("button")
  let buttonText = document.createTextNode("View Your Data!")
  closeButton.classList.add("modal-close-button")
  closeButton.addEventListener("click", closeModal)
  closeButton.addEventListener("click", clearInterval(1))
  closeButton.appendChild(buttonText)
  buttonContainer.appendChild(closeButton)
  modal[0].appendChild(buttonContainer)

}

function closeModal(){
  let modalContainer = document.getElementsByClassName("loading-modal-container")
  modalContainer[0].parentElement.removeChild(modalContainer[0])
}