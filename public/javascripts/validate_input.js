export default function validateInput(ticker, percent){
  debugger
  let validated = true
  if (window.symbols[ticker] === undefined){
    validated = false
  }
  return validated

}