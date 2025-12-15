import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { createBoard } from "../utils/createBoard";
import { gameReducer } from "../reducers/gameReducer";
import Cell from "./Cell";

const initialState = (width, height, bombs) => ({
  board: createBoard(width, height, bombs),
  isGameOver: false,
  isWin: false,
});

export default function Board({
  width,
  height,
  bombs,
  onWin,
  onLose,
  onExit,
}) {
  const [gameState, dispatch] = React.useReducer(
    gameReducer,
    null,
    () => initialState(width, height, bombs)
  );

  const hasReported = React.useRef(false);

  React.useEffect(() => {
    if (hasReported.current) return;

    if (gameState.isWin) {
      hasReported.current = true;
      onWin();
    }

    if (gameState.isGameOver) {
      hasReported.current = true;
      onLose();
    }
  }, [gameState.isWin, gameState.isGameOver]);

  const screenWidth = Dimensions.get("window").width;
  const cellSize = Math.floor((screenWidth * 0.9) / width) - 4;

  const shakeX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!gameState.isGameOver) return;

    Animated.sequence([
      Animated.timing(shakeX, { toValue: -12, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 12, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -8, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 8, duration: 40, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();
  }, [gameState.isGameOver]);

  function handlePress(row, col) {
    if (gameState.isGameOver || gameState.isWin) return;
    dispatch({ type: "HANDLE_CELL", row, col });
  }

  function retryGame() {
    hasReported.current = false;
    dispatch({ type: "RESET_GAME", width, height, bombs });
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.center}>
        <Text style={styles.title}>
          {gameState.isWin
            ? "YOU WIN"
            : gameState.isGameOver
            ? "GAME OVER"
            : "EXPLOSIVE REMOVER"}
        </Text>

        <Animated.View
          style={[
            styles.boardCard,
            { transform: [{ translateX: shakeX }] },
          ]}
        >
          {gameState.board.map((row, r) => (
            <View key={r} style={styles.row}>
              {row.map((cell, c) => (
                <Cell
                  key={c}
                  {...cell}
                  size={cellSize}
                  handlePress={handlePress}
                />
              ))}
            </View>
          ))}
        </Animated.View>

        {!gameState.isGameOver && !gameState.isWin && (
          <View style={styles.buttonBlock}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => dispatch({ type: "REVEAL_BOMBS" })}
            >
              <Text style={styles.primaryText}>REVEAL BOMBS</Text>
            </Pressable>
          </View>
        )}


        {(gameState.isGameOver || gameState.isWin) && (
          <View style={styles.buttonBlock}>
            <Pressable style={styles.primaryButton} onPress={retryGame}>
              <Text style={styles.primaryText}>RETRY</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={onExit}>
              <Text style={styles.secondaryText}>BACK TO MENU</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7FBFC",
  },

  center: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#3A4F7A",
    marginBottom: 20,
  },

  boardCard: {
    backgroundColor: "#D6E6F2",
    padding: 12,
    borderRadius: 16,
    elevation: 6,
  },

  row: {
    flexDirection: "row",
  },

  buttonBlock: {
    marginTop: 24,
    width: "80%",
    gap: 16,
  },

  primaryButton: {
    backgroundColor: "#769FCD",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryText: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#F7FBFC",
    textAlign: "center",
  },

  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#769FCD",
  },

  secondaryText: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#3A4F7A",
    textAlign: "center",
  },
});
