let output = document.querySelector("#output");
let count = 0;
let content = "";
let text_content;
let index = 0;
let states = [];

// Function to fetch and display text
async function text_filler() {
  try {
    const response = await fetch("randomtext.txt");
    const data = await response.text();
    const lines = data.split("\n");
    let x = generateRandomNumber();
    if (x + 30 > lines.length) x = lines.length - 30;
    output.textContent = lines.slice(x, x + 50).join(" ");
    text_content = output.textContent;
    states = new Array(text_content.length).fill("pending");
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
      // Decrement counters but prevent negative values
      count = Math.max(0, count - 1);
      index = Math.max(0, index - 1);
      states[index] = "pending";
      modifyText();
    } else if (input.length === 1) {
      content += input;
      count += 1;

      if (index < text_content.length) {
        if (content.charAt(count - 1) === text_content.charAt(index)) {
          states[index] = "correct";
        } else {
          states[index] = "incorrect";
        }
        index += 1;
        modifyText();
      }
    }
    if (index % 220 === 219) {
      output.scrollBy({
        top: 162,
        behavior: "smooth",
      });
    }
  });
})();

// Function to generate random number
function generateRandomNumber() {
  return Math.floor(Math.random() * 67) + 1;
}

const modifyText = ()=> {
  let modifiedContent = "";
  for (let i = 0; i < text_content.length; i++) {
    if (states[i] === "correct") {
      modifiedContent += `<span class="green">${text_content.charAt(i)}</span>`;
    } else if (states[i] === "incorrect") {
      modifiedContent += `<span class="red">${text_content.charAt(i)}</span>`;
    } else if (states[i] === "next") {
      modifiedContent += `<span class="next">${text_content.charAt(i)}</span>`;
    } else {
      modifiedContent += `<span class="grey">${text_content.charAt(i)}</span>`;
    }
  }
  output.innerHTML = modifiedContent;
};
