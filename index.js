window.addEventListener('keydown', (event) => {
    let input = event.key;

    const keys = document.querySelectorAll(".key");
    //function for describing the onscreen keyboard behaviour.
    keys.forEach((key) => {
        let key_value =key.getAttribute("data-key");
        if (key_value===input || key_value.toLowerCase()===input) {
            key.classList.toggle("selected");
            setTimeout(() => {
                key.classList.toggle("selected");
            }, 150);
        }
    })
    //for taking the input and writing it on the input/output box
    const output = document.querySelector("#output");


})
