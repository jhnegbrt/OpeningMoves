import {getNews, renderNews} from '../util/modal_utils'

export async function renderLoadingModal(dataRange, ticker){

  let page = document.getElementById("page")
  let modalContainer = document.createElement("div")
  modalContainer.classList.add("loading-modal-container")
  let modal = document.createElement("div")
  modal.classList.add("loading-modal")
  let news = await getNews(ticker)
  if (news.data.length > 0){
    modalContainer.appendChild(modal)
    page.appendChild(modalContainer)
    let newsBits = news.data.slice(0, 5)
    renderNews(newsBits, 0)
    let textHolder = document.createElement("div")
    textHolder.classList.add("modal-spinner")
    modal.appendChild(textHolder)
  } else {
    //fix this
    let modalText = document.createElement("p")
    let text = document.createTextNode("No news available!")
    modalText.appendChild(text)
    modal.appendChild(modalText)
    modalContainer.appendChild(modal)
    page.appendChild(modalContainer)
  }

}



export function renderModalClose(modalInterval){
  debugger
  let modal = document.getElementsByClassName("loading-modal")
  let buttonContainer = document.createElement("div")
  buttonContainer.setAttribute("id", "button-container")
  let closeButton = document.createElement("button")
  let buttonText = document.createTextNode("View Your Data!")
  closeButton.classList.add("modal-close-button")
  closeButton.addEventListener("click", closeModal)
  closeButton.addEventListener("click", ()=>{clearInterval(modalInterval)})
  closeButton.appendChild(buttonText)
  buttonContainer.appendChild(closeButton)
  modal[0].appendChild(buttonContainer)

}

function closeModal(){
  let modalContainer = document.getElementsByClassName("loading-modal-container")
  modalContainer[0].parentElement.removeChild(modalContainer[0])
}