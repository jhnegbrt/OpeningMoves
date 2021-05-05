function enterSite(){
  debugger
  let modal = document.querySelector(".instructions-modal-container")
  modal.classList.add("hide")
}

export default function activateEnterButton(){
  debugger
  let enterButton = document.getElementById("enter-button")
  enterButton.addEventListener("click", enterSite)

}

