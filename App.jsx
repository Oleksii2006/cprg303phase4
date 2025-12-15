import { View } from "react-native";
import { useState } from "react";
import TitleScreen from "./src/components/TitleScreen";
import DifficultyScreen from "./src/components/Difficulty";
import Settings from "./src/components/Settings";
import Board from "./src/components/Board";

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [difficulty, setDifficulty] = useState(null);

  const [wins, setWins] = useState(0);
  const [blownUp, setBlownUp] = useState(0);

  if (screen === "menu") {
    return (
      <TitleScreen
        onStart={() => setScreen("difficulty")}
        onSettings={() => setScreen("settings")}
      />
    );
  }

  if (screen === "settings") {
    return (
      <Settings
        wins={wins}
        blownUp={blownUp}
        onBack={() => setScreen("menu")}
      />
    );
  }

  if (screen === "difficulty") {
    return (
      <DifficultyScreen
        onSelect={(diff) => {
          setDifficulty(diff);
          setScreen("game");
        }}
        onBack={() => setScreen("menu")}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Board
        width={difficulty.width}
        height={difficulty.height}
        bombs={difficulty.bombs}
        onWin={() => setWins((w) => w + 1)}
        onLose={() => setBlownUp((l) => l + 1)}
        onExit={() => setScreen("menu")}
      />
    </View>
  );
}
