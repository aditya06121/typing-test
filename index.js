window.addEventListener('keydown', (event) => {
    let input = event.key;
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
        let key_value =key.getAttribute("data-key");
        if (key_value===input || key_value.toLowerCase()===input) {
            key.classList.toggle("selected");
            setTimeout(() => {
                key.classList.toggle("selected");
            }, 150);

        }
    })
})