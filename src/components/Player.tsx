import React from "react";
import cn from "classnames";
import convert from "color-convert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faMinus,
  faSmileBeam,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";

import "./Player.css";

export type PlayerState = {
  id: string;
  isAlive: boolean;
  score: number;
  name?: string;
};

type PlayerProps = {
  isAlive: boolean;
  onAliveChange: Function;
  onScoreChange: Function;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number;
  score: number;
  scoreNormalized: number;
  player: PlayerState;
};

const Player = (props: PlayerProps) => {
  const scoreStyle = {
    // other, aborted design attempts
    // backgroundColor: scoreColor(this.props.scoreNormalized),
    // borderColor: scoreColor(this.props.scoreNormalized),
    // color: this.props.scoreNormalized < 0.5 ? "white" : "black"
    boxShadow: "inset 0 0 2px 1px " + scoreColor(props.scoreNormalized),
  };

  return (
    <div
      className={cn(
        "Player_main mb-0 is-horizontal is-grouped is-grouped-centered is-grouped-multiline js-player is-flex"
      )}
    >
      <div
        className={cn("Player__numberLabel is-normal", {
          "Player--dead": !props.isAlive,
        })}
      >
        <label className="label">{props.id}.</label>
      </div>
      <div
        className={cn("field has-addons", {
          "Player--dead": !props.isAlive,
        })}
      >
        <div className="control">
          <input
            className="input player-name"
            type="text"
            placeholder={`Player #${props.id}`}
            value={props.player.name}
            onChange={props.onNameChange}
          />
        </div>
        <div
          className={cn("control player-score", {
            "Player--dead": !props.isAlive,
          })}
        >
          <button
            className="button"
            tabIndex={-1}
            style={scoreStyle}
            onClick={props.onScoreChange.bind(null, props.id, {
              reset: true,
            })}
          >
            {props.score}
          </button>
        </div>
      </div>
      <div
        className={cn("field is-grouped ml-5", {
          "Player--dead": !props.isAlive,
        })}
      >
        <div className="buttons has-addons mb-0">
          <button
            className="button is-outlined is-danger bad"
            tabIndex={-1}
            onClick={props.onScoreChange.bind(null, props.id, {
              diff: -1,
            })}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faMinus} size="lg" />
            </span>
          </button>
          <button
            className="button is-outlined is-success good"
            tabIndex={-1}
            onClick={props.onScoreChange.bind(null, props.id, {
              diff: +1,
            })}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </span>
          </button>
        </div>

        <StatusButton
          alive={props.isAlive}
          onAliveChange={(isAlive: boolean) => {
            props.onAliveChange(props.id, isAlive);
          }}
        />
      </div>
    </div>
  );
};

const scoreColor = (normalizedScore: number): string => {
  let backgroundOpacity = 0.9;

  let score = normalizedScore * 100;
  let h = Math.floor((score * 120) / 100);
  let s = (Math.abs(score - 50) / 50) * (backgroundOpacity * 100);
  let v = 100;

  return "#" + convert.hsv.hex([h, s, v]);
};

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
      tabIndex={-1}
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

type ResetButtonProps = {
  onResetAll: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const ResetButton = ({ onResetAll }: ResetButtonProps) => {
  return (
    <div className="column has-text-centered">
      <button
        className="button is-danger is-outlined"
        id="reset"
        onClick={onResetAll}
      >
        <span>Reset Scores</span>
        <span className="icon is-medium">
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </span>
      </button>
    </div>
  );
};

export { Player };
export { ResetButton };
