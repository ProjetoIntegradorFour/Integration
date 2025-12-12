import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { useHistoryStore } from "../../store/useHistoryStore";

export default function HistoryList() {
  const history = useHistoryStore((s) => s.history);

  if (!history.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Histórico vazio.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {history.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/book/[id]",
              params: { id: item.isbn },
            })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>Autor: {item.author}</Text>

              <Text style={styles.subtitle}>
                Devolvido em: {item.returnedAt}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 75,
    borderRadius: 8,
    marginRight: 12,
  },
  title: { fontSize: 17, fontWeight: "700", color: "#222" },
  subtitle: { fontSize: 14, color: "#555", marginTop: 2 },

  emptyContainer: { padding: 20, alignItems: "center" },
  emptyText: { color: "#555", fontSize: 16, fontWeight: "600" },
});
