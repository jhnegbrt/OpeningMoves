import submitForm from './submit_form'

document.addEventListener('DOMContentLoaded', loadPage)

function loadPage(){
  let form = document.querySelector("form")
  form.onsubmit = submitForm
}



