export function renderLoadingModal(dataRange){

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

}

export function removeLoadingModal(){

  let modal = document.getElementsByClassName("loading-modal-container")
  debugger
  modal[0].parentElement.removeChild(modal[0])



}