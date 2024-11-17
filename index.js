var output = document.querySelector("#output");
var count = 0;
var content = "";
var text_content;
var index = 0;

// Function to fetch and display text
async function text_filler() {
  try {
    const response = await fetch("randomtext.txt");
    const data = await response.text();
    const lines = data.split("\n");
    let x = generateRandomNumber();
    console.log(x);
    if (x + 30 > lines.length) x = lines.length - 30;
    output.textContent = lines.slice(x, x + 50).join(" ");
    text_content = output.textContent;
  } catch (error) {
    output.textContent = `Error loading file: ${error.message}`;
  }
}

// Ensure text_filler runs before adding event listeners
(async () => {
  await text_filler();

  // Add event listener after text_filler completes
  window.addEventListener("keydown", (event) => {
    const input = event.key;

    const keys = document.querySelectorAll(".key");
    // Function for describing the onscreen keyboard behavior
    keys.forEach((key) => {
      let key_value = key.getAttribute("data-key");
      if (key_value === input || key_value.toLowerCase() === input) {
        key.classList.toggle("selected");
        setTimeout(() => {
          key.classList.toggle("selected");
        }, 150);
      }
    });
    //logic for capturing the user input into the global content variable
    if (input === "Backspace") {
      // Remove last character from content
      content = content.slice(0, -1);
      console.log(content);
      // Decrement counters but prevent negative values
      count = Math.max(0, count - 1);
      index = Math.max(0, index - 1);
      modifyText(index, "green");
    } else if (input.length === 1) {
      content += input;
      count += 1;

      if (index < text_content.length) {
        if (content.charAt(count - 1) === text_content.charAt(index)) {
          console.log(true, content, index);
          index += 1;
          modifyText(index, "green");
        } else {
          console.log(false, content);
          index += 1;
          modifyText(index, "red");
        }
      }
    }
  });
})();

// Function to generate random number
function generateRandomNumber() {
  return Math.floor(Math.random() * 67) + 1;
}
const modifyText = function (index, type) {
  const content = output.textContent;
  const modifiedContent =
    content.slice(0, index - 1) +
    `<span class="${type}">${content.charAt(index - 1)}</span>` +
    `<span class="grey">${content.charAt(index)}</span>` +
    content.slice(index + 1);
  output.innerHTML = modifiedContent;
};
