export default function validateInput(ticker, percent){
  let validated = true
  let errors = []
  if (window.symbols[ticker] === undefined){
    validated = false
    errors.push("Please enter a valid ticker!")
  }
  debugger
  if ((/^[\d]*(\.[\d]+)?$/).test(percent) === false){
    validated = false
    errors.push("Please enter a valid numerical value")
  }
  return {valid: validated, errors: errors}

}