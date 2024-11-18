var output = document.querySelector("#output");
var count = 0;
var content = "";
var text_content;
var index = 0;
var words2, words1;
var wpm;
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
      modifyText(index, "green");
    } else if (input.length === 1) {
      content += input;
      count += 1;

      if (index < text_content.length) {
        if (content.charAt(count - 1) === text_content.charAt(index)) {
          index += 1;
          modifyText(index, "green");
        } else {
          index += 1;
          modifyText(index, "red");
        }
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
const modifyText = function (index, type) {
  const content = output.textContent;
  const modifiedContent =
    content.slice(0, index - 1) +
    `<span class="${type}">${content.charAt(index - 1)}</span>` +
    `<span class="grey">${content.charAt(index)}</span>` +
    content.slice(index + 1);
  output.innerHTML = modifiedContent;
};

//pop up
//reload pop up
//event listener
const overlay = document.getElementById("overlay");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");
const inpt_time = document.getElementById("time-limit");

window.addEventListener("load", () => {
  setTimeout(() => {
    overlay.classList.add("show"); // Add class to show the overlay
  }, 500);
  //display for mobiles
  const x = window.outerWidth;
  console.log(x);
  if (x < 900) {
    const display = document.querySelector("body");
    display.outerHTML = `
  <body style="background-color: black;color:white; hight:100% width:100%;position: fixed"><div style="font-size: 50px;padding:20px">Im sorry but this website is specially designed for desktop</div></body>
  `;
  }
});

// Close the overlay when the close button inside the overlay is clicked
closeOverlayBtn.addEventListener("click", () => {
  overlay.classList.remove("show");
  let time = inpt_time.value;
  setInterval(triggerEvent, time);
});

//results logic
const finder = (index) => {
  let x = text_content.slice(0, index);
  words1 = x.trim().toLowerCase().split(/\s+/);
  words2 = content.trim().toLowerCase().split(/\s+/);
};
const comparison = () => {
  const wordCount1 = words1.length;
  const wordCount2 = words2.length;

  // Find common and different words
  const commonWords = words1.filter((word) => words2.includes(word));
  const differentWords = [
    ...new Set([
      ...words1.filter((word) => !words2.includes(word)),
      ...words2.filter((word) => !words1.includes(word)),
    ]),
  ];

  // Number of same and different words
  const sameWordCount = commonWords.length;
  const diffWordCount = differentWords.length;
  wpm = sameWordCount * (60000 / inpt_time.value);
  if (index === 0) {
    return {
      correctWords: 0, // Word count in the first string
      typedWords: 0, // Word count in the second string
      sameWordCount: 0, // Number of same words
      diffWordCount: 0, // Number of different words
      wpm: 0,
    };
  } else {
    return {
      correctWords: wordCount1, // Word count in the first string
      typedWords: wordCount2, // Word count in the second string
      sameWordCount: sameWordCount, // Number of same words
      diffWordCount: diffWordCount, // Number of different words
      wpm: wpm,
    };
  }
};

// Event handler function
function triggerEvent() {
  const overlay = document.getElementById("overlay");

  finder(index);
  const x = comparison();
  const results = document.querySelector(".overlay-content");

  results.innerHTML = `<p>Results</p>
          <p>Number of words typed: ${x.typedWords}</p>
          <p>Number of correct words typed: ${x.sameWordCount}</p>
          <p style="font-size: 20px; font-weight: bold; color: #003579;">WPM: ${x.wpm}</p>
          <p>Thanks for going over my hobby project</p>
          <button onclick="location.reload()">Retake the test!</button>
    `;
  overlay.classList.add("show");
}
