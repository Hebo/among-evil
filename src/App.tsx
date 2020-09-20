import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import "./App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faMinus,
  faSmileBeam,
  faSkullCrossbones,
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

  const setAlive = (id: number, isAlive: boolean) => {
    console.log("status updated");
    players[id - 1].isAlive = isAlive;
    setPlayers([...players]);
  };

  const resetAll = () => {
    setPlayers(
      players.map((p) => {
        p.isAlive = true;
        return p;
      })
    );
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
      <ResetButton resetFn={resetAll} />

      {playerEls}
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
      <div className="Player_main mb-0 is-horizontal is-grouped is-grouped-centered is-grouped-multiline js-player is-flex">
        <div
          className={cn("Player__numberLabel is-normal", {
            "Player--dead": !this.props.isAlive,
          })}
        >
          <label className="label">{this.props.id}.</label>
        </div>
        <div
          className={cn("field has-addons", {
            "Player--dead": !this.props.isAlive,
          })}
        >
          <div className="control">
            <input
              className="input player-name"
              type="text"
              placeholder={`Player #${this.props.id}`}
            />
          </div>
          <div
            className={cn("control player-score", {
              "Player--dead": !this.props.isAlive,
            })}
          >
            <button className="js-score button">0</button>
          </div>
        </div>
        <div
          className={cn("field is-grouped ml-5", {
            "Player--dead": !this.props.isAlive,
          })}
        >
          <div className="buttons has-addons mb-0">
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
          </div>

          <StatusButton
            alive={this.props.isAlive}
            onAliveChange={(isAlive: boolean) => {
              this.props.onAliveChange(this.props.id, isAlive);
            }}
          />
        </div>
      </div>
    );
  }
}

type StatusButtonProps = { alive: boolean; onAliveChange: Function };
const StatusButton = ({ alive, onAliveChange }: StatusButtonProps) => {
  let btnClasses,
    btnIcon,
    btnText = null;
  if (alive) {
    btnClasses = "is-success is-light";
    btnText = "Alive";
    btnIcon = faSmileBeam;
  } else {
    btnClasses = "is-dark";
    btnText = "Press F";
    btnIcon = faSkullCrossbones;
  }

  return (
    <button
      className={`status-btn button ml-2 js-status ${btnClasses}`}
      onClick={() => {
        onAliveChange(!alive);
      }}
    >
      <span>{btnText}</span>
      <span className="icon is-medium">
        <FontAwesomeIcon icon={btnIcon} size="lg" />
      </span>
    </button>
  );
};

type ResetButtonProps = { resetFn: Function };
const ResetButton = ({ resetFn }: ResetButtonProps) => {
  const resetAll = () => {
    document.querySelectorAll(".js-score").forEach((e) => {
      e.innerHTML = "0";
    });

    resetFn();
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
