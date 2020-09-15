import React from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ready = function (cb: any) {
  // Check if the `document` is loaded completely
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", function (e) {
        cb();
      })
    : cb();
};

let switchStatus = (el: any, reset = false) => {
  let statusAlive = ["is-success", "is-light"];
  let statusDead = "is-dark";

  let alive = el.classList.contains(statusAlive[0]);
  if (!alive || reset) {
    el.classList.remove(statusDead);
    el.classList.add(...statusAlive);
    el.textContent = "Alive";
  } else {
    el.classList.add(statusDead);
    el.classList.remove(...statusAlive);
    el.textContent = "Dead";
  }
};

ready(function () {
  let elems = document.querySelectorAll(".js-player");
  elems.forEach((el) => {
    let scoreEle = el.querySelector(".js-score");
    let statusEl = el.querySelector(".js-status");
    if (scoreEle === null || statusEl === null) {
      return;
    }

    el.querySelector(".good")!.addEventListener("click", () => {
      scoreEle!.innerHTML = (parseInt(scoreEle!.innerHTML) + 1).toString();
    });

    el.querySelector(".bad")!.addEventListener("click", () => {
      scoreEle!.innerHTML = (parseInt(scoreEle!.innerHTML) - 1).toString();
    });

    scoreEle!.addEventListener("click", () => {
      scoreEle!.innerHTML = "0";
    });

    statusEl.addEventListener("click", (e) => {
      switchStatus(e.target);
    });
  });
});

function App() {
  const playerTemplate = (
    <li>
      <div className="field is-horizontal js-player">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input player-name"
              type="text"
              placeholder="Player"
            />
          </div>
          <div className="control player-score">
            <button className="js-score button">0</button>
          </div>
        </div>
        <div className="field ml-5">
          <button className="button is-outlined is-danger bad">
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faMinus} size="lg" />
            </span>
          </button>
          <button className="button is-outlined is-success good">
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </span>
          </button>
          <button className="status-btn button is-success is-light js-status">
            Alive
          </button>
        </div>
      </div>
    </li>
  );

  let playerEls = [...Array(10)].map((value: undefined, index: number) => {
    // <Field id={index + 1} key={index} />
    return playerTemplate;
  });

  return (
    <div className="App">
      <ResetButton />

      <ol type="1">{playerEls}</ol>
    </div>
  );
}

const ResetButton = () => {
  const resetAll = () => {
    document.querySelectorAll(".js-score").forEach((e) => {
      e.innerHTML = "0";
    });

    document.querySelectorAll(".js-status").forEach((e) => {
      switchStatus(e, true);
      return;
    });
  };

  return (
    <div className="column has-text-centered">
      <button
        className="button is-danger is-outlined"
        id="reset"
        onClick={resetAll}
      >
        <span>Reset Scores</span>
        <span className="icon is-medium">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </span>
      </button>
    </div>
  );
};

export default App;
