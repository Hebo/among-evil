import React, { useState } from "react";
import "./App.css";

import { Player, ResetButton } from "./components/Player";

type PlayerState = {
  id: string;
  isAlive: boolean;
  score: number;
};

interface ScoreMap {
  [key: string]: number;
}

const normalizeScores = (players: PlayerState[]): ScoreMap => {
  let defaultScore = 0.5;
  let scores = players.map((p) => p.score);
  let minScore = Math.min.apply(null, scores);
  let range = Math.max.apply(null, scores) - minScore;

  let normalized = players.reduce((acc: ScoreMap, p) => {
    if (range == 0) {
      acc[p.id] = defaultScore;
    } else {
      acc[p.id] = (p.score - minScore) / range;
    }

    return acc;
  }, {});

  console.log(normalized);

  return normalized;
};

function App() {
  const numPlayers = 10;
  const [players, setPlayers] = useState<PlayerState[]>(() => {
    let ps: PlayerState[] = [];
    [...Array(numPlayers)].forEach((_, index) => {
      ps.push({ id: index.toString(), isAlive: true, score: 0 });
    });
    return ps;
  });

  const handleScoreChange = (id: number, { diff = 0, reset = false }): void => {
    console.log("handlescore");
    if (reset) {
      players[id - 1].score = 0;
    } else {
      players[id - 1].score += diff;
    }

    setPlayers([...players]);
  };

  const setAlive = (id: number, isAlive: boolean) => {
    setPlayers((ps) => {
      ps[id - 1].isAlive = isAlive;
      return [...ps];
    });
  };

  const resetAll = () => {
    setPlayers(
      players.map((p) => {
        p.isAlive = true;
        p.score = 0;
        return p;
      })
    );
  };

  let scoresNormalized = normalizeScores(players);

  let playerEls = players.map((player, index: number) => {
    return (
      <Player
        key={index}
        id={index + 1}
        isAlive={player.isAlive}
        onAliveChange={setAlive}
        onScoreChange={handleScoreChange}
        score={player.score}
        scoreNormalized={scoresNormalized[index]}
      />
    );
  });

  return (
    <div className="App">
      <ResetButton onResetAll={resetAll} />

      {playerEls}
    </div>
  );
}

export default App;
