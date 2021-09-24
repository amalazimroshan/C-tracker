window.addEventListener("hashchange", () => {
  anime({
    targets: ".card",
    duration: 2000,
    translateY: -20,
    opacity: 1,
  });
});
//   <svg  class="maximise-btn" onClick="maximise()">

// </svg>
function minimize() {
  let circle = `
  <svg class="maximise-btn" onClick="maximise()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
</svg>`;
  anime({
    targets: ".card",
    left: "40vw",
    scaleX: 0.2,
    scaleY: 0.5,
    borderRadius: "10%",
    easing: "easeInCubic",
    // complete: (anim) => {
    //   document.querySelector(
    //     ".card"
    //   ).innerHTML += `<img class="maximise-btn" src="assets/751-share-outline.svg" onClick="maximise()" alt="maximise svg">`;
    // },
    complete: (anim) => {
      document.querySelector(".card").innerHTML += circle;
    },
    // complete: (anim) => {
    //   document.querySelector(
    //     ".card"
    //   ).innerHTML = `<svg viewBox="0 0 20 20" width="1rem">
    //     <path d="M310.33,354.5H81.57c-3.31,0-6-2.69-6-6V119.62c0-24.33,19.78-44.12,44.1-44.12H215c3.31,0,6,2.69,6,6
    //     s-2.69,6-6,6h-95.33c-17.7,0-32.1,14.41-32.1,32.12V342.5h222.76c17.7,0,32.1-14.41,32.1-32.12v-96.44c0-3.31,2.69-6,6-6
    //     c3.31,0,6,2.69,6,6v96.44C354.43,334.71,334.65,354.5,310.33,354.5z"  stroke="#d7faf4" stroke-width="10"/></svg>`;
    // },
  });
}

function maximise() {
  document
    .querySelector(".card")
    .removeChild(document.querySelector(".maximise-btn"));
  anime({
    targets: ".card",
    left: "0vw",
    scaleX: 1,
    scaleY: 1,
    borderRadius: "0%",
    // easing: "easeInOutQuad",
  });
}

window.addEventListener("offline", () => {
  showMessage("you are offline", "#F00", true);
});
window.addEventListener("online", () => {
  showMessage("connection restablised 👌", "#25ca2d");
});

// let maximiseBtnIcon = `<svg viewBox="0 0 24 24" onClick="maximise()" aria-hidden="true" class="maximise-btn">
// <g>
// <path class="arrow" d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z">
// </path>
// </g></svg>`;
// let maximiseBtnIconq = `<svg viewBox="0 0 500 500" onClick="maximise()" class="maximise-btn">
// <g>
// <path d="M310.33,354.5H81.57c-3.31,0-6-2.69-6-6V119.62c0-24.33,19.78-44.12,44.1-44.12H215c3.31,0,6,2.69,6,6
// s-2.69,6-6,6h-95.33c-17.7,0-32.1,14.41-32.1,32.12V342.5h222.76c17.7,0,32.1-14.41,32.1-32.12v-96.44c0-3.31,2.69-6,6-6
// c3.31,0,6,2.69,6,6v96.44C354.43,334.71,334.65,354.5,310.33,354.5z">
// </path>
// </g>
// </svg>`;
function showMessage(msg, color = "#343434", wait) {
  console.log(msg);
  let container = document.getElementById("container");
  let messageBox = document.createElement("div");
  if (container.querySelector(".popuptext"))
    container.removeChild(container.querySelector(".popuptext"));
  messageBox.textContent = msg;
  messageBox.style.background = color;
  messageBox.classList.add("popuptext");
  container.appendChild(messageBox);
  if (!wait) {
    setTimeout(() => {
      container.removeChild(messageBox);
    }, 4000);
  }
}
