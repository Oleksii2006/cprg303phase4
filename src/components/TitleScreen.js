import { View, Text, Pressable, StyleSheet } from "react-native";

export default function TitleScreen({ onStart, onSettings }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>EXPLOSIVE REMOVER</Text>
          <Text style={styles.subtitle}>
            Not to be confused with MineSweeper
          </Text>
        </View>

        <View style={styles.buttons}>
          <Pressable style={styles.primaryButton} onPress={onStart}>
            <Text style={styles.primaryText}>START GAME</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onSettings}>
            <Text style={styles.secondaryText}>SETTINGS</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBFC",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 80,
  },

  titleBlock: {
    alignItems: "center",
  },

  title: {
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    color: "#3A4F7A",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 12,
    color: "#5E7FA3",
  },

  buttons: {
    width: "80%",
    gap: 16,
  },

  primaryButton: {
    backgroundColor: "#769FCD",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    elevation: 5,
  },

  primaryText: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    color: "#F7FBFC",
  },

  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#769FCD",
  },

  secondaryText: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    color: "#3A4F7A",
  },
});
