import React from "react";
import "./App.css";

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
  return (
    <div className="App">
      <ResetButton />
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
    <button
      className="button is-warning is-light"
      id="reset"
      onClick={resetAll}
    >
      Reset Scores
    </button>
  );
};

export default App;
