import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faMinus,
  faSmileBeam,
} from "@fortawesome/free-solid-svg-icons";

type PlayerState = {
  isAlive: boolean;
};
function App() {
  const numPlayers = 10;
  const [players, setPlayers] = useState<PlayerState[]>([]);

  useEffect(() => {
    console.log("rendering");
    let ps: PlayerState[] = [];
    [...Array(numPlayers)].forEach(() => {
      ps.push({ isAlive: true });
      // return <Player key={index} isAlive={true} />;
      // return playerTemplate;
    });

    setPlayers(ps);
  }, []);

  let didBinds = useRef(false);
  useEffect(() => {
    if (didBinds.current) {
      return;
    } else if (players.length > 0) {
      didBinds.current = true;
    }

    console.log("useEffect -> binding");
    let elems = document.querySelectorAll(".js-player");
    // console.log(elems)
    elems.forEach((el) => {
      let scoreEle = el.querySelector(".js-score");
      let statusEl = el.querySelector(".js-status");
      if (scoreEle === null || statusEl === null) {
        // console.log("not found")
        return;
      }
      // console.log("found")

      el.querySelector(".good")!.addEventListener("click", () => {
        scoreEle!.innerHTML = (parseInt(scoreEle!.innerHTML) + 1).toString();
      });

      el.querySelector(".bad")!.addEventListener("click", () => {
        scoreEle!.innerHTML = (parseInt(scoreEle!.innerHTML) - 1).toString();
      });

      scoreEle!.addEventListener("click", () => {
        // console.log("scoreele")
        scoreEle!.innerHTML = "0";
      });
    });
  });

  let setAlive = (id: number, isAlive: boolean) => {
    console.log("status updated");
    players[id - 1].isAlive = isAlive;
    setPlayers([...players]);
  };

  let playerEls = players.map((player, index: number) => {
    return (
      <Player
        key={index}
        id={index + 1}
        isAlive={player.isAlive}
        onAliveChange={setAlive}
      />
    );
  });

  return (
    <div className="App">
      <ResetButton />

      <ol type="1">{playerEls}</ol>
    </div>
  );
}

type PlayerProps = {
  isAlive: boolean;
  onAliveChange: Function;
  id: number;
};

class Player extends React.Component<PlayerProps> {
  render() {
    return (
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

            <StatusButton
              alive={this.props.isAlive}
              onAliveChange={(isAlive: boolean) => {
                this.props.onAliveChange(this.props.id, isAlive);
              }}
            />
          </div>
        </div>
      </li>
    );
  }
}

type StatusButtonProps = { alive: boolean; onAliveChange: Function };
const StatusButton = ({ alive, onAliveChange }: StatusButtonProps) => {
  let btnClasses,
    // icon,
    btnText = null;
  if (alive) {
    btnClasses = "is-success is-light";
    btnText = "Alive";
  } else {
    btnClasses = "is-dark";
    btnText = "Dead";
  }

  return (
    <button
      className={`status-btn button js-status ${btnClasses}`}
      onClick={() => {
        onAliveChange(!alive);
      }}
    >
      <span>{btnText}</span>
      <span className="icon is-medium">
        <FontAwesomeIcon icon={faSmileBeam} size="lg" />
      </span>
    </button>
  );
};

const ResetButton = () => {
  const resetAll = () => {
    document.querySelectorAll(".js-score").forEach((e) => {
      e.innerHTML = "0";
    });

    document.querySelectorAll(".js-status").forEach((e) => {
      // switchStatus(e, true);
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