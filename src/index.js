import _ from "lodash";
import "./style.css";
import GameBoard from "./gameboard";
function component() {
  const element = document.createElement("div");
  element.classList.add("hello");

  // Lodash, now imported by this script
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
