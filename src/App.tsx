import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";

import { Player, ResetButton, PlayerState } from "./components/Player";
import "./App.css";

interface ScoreMap {
  [key: string]: number;
}

const normalizeScores = (players: PlayerState[]): ScoreMap => {
  let defaultScore = 0.5;
  let scores = players.map((p) => p.score);
  let minScore = Math.min.apply(null, scores);
  let range = Math.max.apply(null, scores) - minScore;

  let normalized = players.reduce((acc: ScoreMap, p, idx) => {
    if (range === 0) {
      acc[idx] = defaultScore;
    } else {
      acc[idx] = (p.score - minScore) / range;
    }

    return acc;
  }, {});

  return normalized;
};

function App() {
  const numPlayers = 10;
  const [players, setPlayers] = useState<PlayerState[]>(() => {
    let ps: PlayerState[] = [];
    [...Array(numPlayers)].forEach((_, index) => {
      ps.push({ name: "", id: index.toString(), isAlive: true, score: 0 });
    });
    return ps;
  });

  const handleScoreChange = (id: string, { diff = 0, reset = false }): void => {
    console.log("handlescore");
    let idx = players.findIndex((el) => el.id === id);
    if (reset) {
      players[idx].score = 0;
    } else {
      players[idx].score += diff;
    }

    setPlayers([...players]);
  };

  const handleNameChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // console.log("handleNameChange: ", id, event);
    let value = event.currentTarget.value;
    setPlayers((ps) => {
      let idx = ps.findIndex((el) => el.id === id);
      ps[idx].name = value;

      return [...ps];
    });
  };

  const setAlive = (id: string, isAlive: boolean) => {
    setPlayers((ps) => {
      let idx = ps.findIndex((el) => el.id === id);
      ps[idx].isAlive = isAlive;
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
        index={index + 1}
        isAlive={player.isAlive}
        onAliveChange={setAlive}
        onScoreChange={handleScoreChange}
        onNameChange={handleNameChange.bind(null, player.id)}
        score={player.score}
        player={player}
        scoreNormalized={scoresNormalized[index]}
      />
    );
  });

  return (
    <div className="App">
      <ResetButton onResetAll={resetAll} />

      <ReactSortable
        handle=".Player__numberLabel"
        list={players}
        setList={setPlayers}
      >
        {playerEls}
      </ReactSortable>
    </div>
  );
}

export default App;
