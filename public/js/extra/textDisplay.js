let printIndex = 0;
const printDelay = 50; // adjust the speed of printing here
let textToInsert;

function displayText(id, text){

  const usernameElement = document.querySelector(id);

  let textToInsert= text
  
  if (usernameElement) {
    const existingText = usernameElement.textContent;
    const username = existingText.split(':')[0];
    const printText = textToInsert.trim(); 
    usernameElement.textContent = username + ': '; // clear existing text and set username
    printLine(id, printText); 
  }
}

function printLine(id, text) {
  let printIndex = 0;
const printDelay = 50;

  const usernameElement = document.querySelector(id);
  let i = 0;
  const intervalId = setInterval(() => {
    if (i < text.length) {
      usernameElement.textContent += text[i];
      i++;
    } else {
      clearInterval(intervalId);
      printIndex++;
    }
  }, printDelay);
}

export {displayText, printLine}