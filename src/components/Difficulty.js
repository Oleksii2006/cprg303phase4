import { View, Text, Pressable, StyleSheet } from "react-native";

const levels = [
  { label: "NORMAL", width: 8, height: 8, bombs: 10 },
  { label: "HARD", width: 10, height: 10, bombs: 15 },
];

export default function DifficultyScreen({ onSelect, onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELECT DIFFICULTY</Text>

      <View style={styles.buttons}>
        {levels.map(level => (
          <Pressable
            key={level.label}
            style={styles.primaryButton}
            onPress={() => onSelect(level)}
          >
            <Text style={styles.primaryText}>{level.label}</Text>
          </Pressable>
        ))}

        <Pressable style={styles.secondaryButton} onPress={onBack}>
          <Text style={styles.secondaryText}>BACK</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBFC",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    color: "#3A4F7A",
    marginBottom: 32,
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
