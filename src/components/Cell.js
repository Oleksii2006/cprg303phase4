import * as React from "react";
import { StyleSheet, View, Text, Pressable, Animated } from "react-native";

export default function Cell({
  row,
  col,
  isBomb,
  isFlipped,
  isRevealed,
  value,
  size,
  handlePress,
}) {
  const showBomb = isBomb && (isFlipped || isRevealed);
  const showValue = isFlipped && !isBomb && value > 0;

  const fontScale = size / 32;
  const numberSize = Math.max(14, 18 * fontScale);
  const bombSize = Math.max(14, 18 * fontScale);

  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (!isBomb || !isFlipped) return;

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.35,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isBomb, isFlipped]);

  return (
    <Pressable onPress={() => handlePress(row, col)}>
      <Animated.View
        style={[
          styles.cell,
          {
            width: size,
            height: size,
            borderRadius: size * 0.25,
            transform: [{ scale: scaleAnim }],
          },
          isFlipped ? styles.flipped : styles.hidden,
          showBomb && styles.bombCell,
          isRevealed && !isFlipped && styles.revealed,
        ]}
      >
        {showValue && (
          <Text
            style={[
              styles.text,
              styles[`num${value}`],
              { fontSize: numberSize },
            ]}
          >
            {value}
          </Text>
        )}

        {showBomb && (
          <Text style={[styles.bomb, { fontSize: bombSize }]}>💣</Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    justifyContent: "center",
    margin: 2,
  },

  hidden: {
    backgroundColor: "#F7FBFC",
    borderWidth: 1,
    borderColor: "#B9D7EA",
  },

  flipped: {
    backgroundColor: "#D6E6F2",
  },

  bombCell: {
    backgroundColor: "#FADADD",
  },

  revealed: {
    borderWidth: 2,
    borderColor: "#F08080",
  },

  text: {
    fontWeight: "900",
  },

  bomb: {
    fontWeight: "900",
  },

  num1: { color: "#3A4F7A" },
  num2: { color: "#547792" },
  num3: { color: "#769FCD" },
  num4: { color: "#5E7FA3" },
  num5: { color: "#8B5E83" },
  num6: { color: "#4B7F52" },
  num7: { color: "#7A3A3A" },
  num8: { color: "#333333" },
});
