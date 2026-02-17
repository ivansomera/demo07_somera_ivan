import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//--------------------------------------------------------------
// If you have custom global styles, import them as well:
//--------------------------------------------------------------
import "/src/styles/style.css";

//--------------------------------------------------------------
// Custom global JS code (shared with all pages)can go here.
//--------------------------------------------------------------

import { onAuthReady } from "./authentication.js";

function showName() {
  const nameElement = document.getElementById("name-goes-here");

  onAuthReady((user) => {
    if (!user) {
      if (window.location.pathname.endsWith("main.html")) {
        location.href = "index.html";
      }
      return;
    }

    const name = user.displayName || user.email;
    if (nameElement) nameElement.textContent = `${name}!`;
  });
}

showName();

// This is an example function. Replace it with your own logic.
function sayHello() {
  // TODO: implement your logic here
}
document.addEventListener("DOMContentLoaded", sayHello);
