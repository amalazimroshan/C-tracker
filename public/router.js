const socket = io();
let root = document.querySelector("#container");
const HomeComponent = {
  render: () => {
    return `<div class="button-container">
        <a href="#/share"><button class="button">share</button></a>
        <a href="#/track"><button class="button">track</button></a>
        `;
  },
};

const ErrorComponent = {
  render: () => {
    return `<div class="card">
    <div class="headerfield">
    <div>-</div>
    <a href="index.html"><button class="close">✖</button></a>
    </div>
    <p> Error: 404 page not found</p></div>
    `;
  },
};
const ShareComponent = {
  render: () => {
    let code = Math.random().toString(36).substring(7);
    ///socket code ////
    socket.emit("room code", code);
    ///////////////////
    const watchCoodinates = navigator.geolocation.watchPosition(update, error);
    // let copycode = `<svg class="copycode" code="${code}" onClick="copyCode(this)" viewBox="0 0 24 24" fill="none" stroke="#DEFEFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
    return `<div class="card">
    <div class="headerfield">
    <h3>CODE: ${code} <i class="bi bi-clipboard" code=${code} onClick="copyCode(this)"></i></h3>
    <div>
    <button class="minimize" onClick="minimize()"><i class="bi bi-arrows-angle-contract"></i></button>
    <a href="index.html"><button class="close" >✖</button></a>
    </div>
    </div>
     <p>share this code to share your location to ones who needs to track
    </div>`;
  },
};
function update(position) {
  map.setCenter({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
  userMarker.setPosition({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
  // marker.setPosition(
  //   new google.maps.LatLng({
  //     lat: position.coords.latitude,
  //     lng: position.coords.longitude,
  //   })
  // );
  socket.emit("coordinates", {
    coords: { lat: position.coords.latitude, lng: position.coords.longitude },
    code: document.querySelector(".bi-clipboard").getAttribute("code"),
  });
}
function error() {
  alert("ERROR accessing your location!");
}

function copyCode(e) {
  let code = e.getAttribute("code");
  navigator.clipboard.writeText(code).then(() => {
    // let popup = document.createElement("span");
    // popup.textContent = "code copied to clipboard";
    // popup.classList.add("popuptext");
    // e.parentElement.appendChild(popup);
    // console.log("code copied to clipboard");
    showMessage("code copied to clipboard");
  });
}
const TrackComponent = {
  render: () => {
    // let coordinates = {};

    const watchCoodinates = navigator.geolocation.watchPosition((p) => {
      // console.table({ lat: p.coords.latitude, lng: p.coords.longitude });
      // coordinates["tracker"] = {
      //   lat: p.coords.latitude,
      //   lng: p.coords.longitude,
      // };
      let positon = {
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      };
      userMarker.setPosition(positon);
      bounds.extend(positon);
      center = positon;
      // marker.setPosition(
      //   new google.maps.LatLng({
      //     lat: p.coords.latitude,
      //     lng: p.coords.longitude,
      //   })
      // );
    });
    isNotified = false;
    socket.on("lolipop", (coords) => {
      // console.log(coords);
      // marker.setPosition(new google.maps.LatLng(coords));
      // map.setCenter(coords);
      // coordinates["sharer"] = { lat: coords.lat, lng: coords.lng };
      checkPoint = coords;
      sharerMarker.setPosition(coords);
      bounds.extend(coords);
      map.fitBounds(bounds);
      if (!isNotified) {
        if (arePointsNear(checkPoint, center, 5)) {
          isNotified = true;
          Notification.requestPermission().then((result) => {
            if (result === "granted") {
              Notify();
            }
          });
        }
      }
      // else isNotified = false;
    });

    function arePointsNear(checkPoint, centerPoint, km) {
      var ky = 40000 / 360;
      var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
      var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
      var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
      return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    function Notify() {
      const notifyTitle = "alert!";
      const notifyBody = "your bus is within 5km";
      const notifyImg = "https://img.icons8.com/color/96/000000/bus.png";
      const options = {
        body: notifyBody,
        icon: notifyImg,
      };
      new Notification(notifyTitle, options);
    }

    return `
    <div class="card">
    <div class="headerfield">
    <h3>enter room code</h3>
    <button class="minimize" onClick="minimize()"><i class="bi bi-arrows-angle-contract"></i></button>
    <a href="index.html"><button class="close" >✖</button></a>
    </div>
    <div class="submitfield"><input type="text"><button class="track-button" onClick="shareCode(this)">track</button></div>
    <p>share this code to one who needs to track your positon</p>

    <svg fill="#defefc42" width="101" height="96" viewBox="0 0 101 96" fill="none"
        xmlns="http://www.w3.org/2000/svg" class="triangle">
        <!-- <g transform="scale(2)"></g> -->
        <path
            d="M32.502 21.0791C32.9447 16.4816 38.1984 14.0874 41.9586 16.7695L95.542 54.9902C99.3022 57.6723 98.7489 63.4192 94.5459 65.3346L34.6542 92.6289C30.4512 94.5443 25.7509 91.1916 26.1936 86.594L32.502 21.0791Z" />

    </svg>
    <svg fill="#defefc42" width="146" height="126" viewBox="0 0 146 126" fill="none"
        xmlns="http://www.w3.org/2000/svg" class="rectangle">
        <rect y="48.5545" width="121.767" height="83.8768" rx="6" transform="rotate(-24.5 0 49.5545)" />
    </svg>
    <svg fill="#defefc42" width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="circle">
        <circle cx="49" cy="49" r="49" />
    </svg>
</div>`;
  },
};

function shareCode(e) {
  socket.emit("room code", e.previousSibling.value);
}

socket.on("message", (msg) => {
  if (location.hash.slice(1) == "/share") showMessage(msg);
});

const routes = [
  { path: "/", component: HomeComponent },
  { path: "/share", component: ShareComponent },
  { path: "/track", component: TrackComponent },
];
const router = () => {
  const parseLocation = () => location.hash.slice(1).toLowerCase() || "/";
  const path = parseLocation();

  const findComponnetBypath = (path, routes) =>
    routes.find((route) =>
      route.path.match(new RegExp(`^\\${path}$`, "gmi"))
    ) || undefined;
  const { component = ErrorComponent } =
    findComponnetBypath(path, routes) || {};

  root.innerHTML = component.render();
};
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
