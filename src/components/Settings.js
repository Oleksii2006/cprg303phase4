import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Settings({ wins, blownUp, onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>STATS</Text>

      <View style={styles.card}>
        <Text style={styles.stat}>WINS</Text>
        <Text style={styles.value}>{wins}</Text>

        <Text style={styles.stat}>BLOWN UP</Text>
        <Text style={styles.value}>{blownUp}</Text>
      </View>

      <Pressable style={styles.secondaryButton} onPress={onBack}>
        <Text style={styles.secondaryText}>BACK</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBFC",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    color: "#3A4F7A",
    marginBottom: 32,
  },

  card: {
    width: "100%",
    backgroundColor: "#D6E6F2",
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: "center",
    gap: 8,
  },

  stat: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 2,
    textAlign: "center",
    color: "#5E7FA3",
  },

  value: {
    fontSize: 28,
    fontWeight: "900",
    color: "#3A4F7A",
    marginBottom: 12,
  },

  secondaryButton: {
    width: "80%",
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
