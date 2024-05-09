let printIndex = 0;
const printDelay = 50; // adjust the speed of printing here

document.querySelector('#attack').addEventListener('click', (event) => {
  event.preventDefault();

  const usernameElement = document.querySelector('#userMsg');
  const textToInsert = ' Attack and dealt';
  
  if (usernameElement) {
    const existingText = usernameElement.textContent;
    const username = existingText.split(':')[0];
    const printText = textToInsert.trim(); 
    usernameElement.textContent = username + ': '; // clear existing text and set username
    printLine(printText); 
  }
})

function printLine(text) {
  const usernameElement = document.querySelector('#userMsg');
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