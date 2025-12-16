import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useHistoryStore } from "@/store/useHistoryStore";
import { router } from "expo-router";

export default function HistoryList() {
  const { history } = useHistoryStore();

  if (!history.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Histórico vazio.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {history.map((loan) => (
        <TouchableOpacity
          key={loan.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/book/[id]",
              params: { id: loan.id },
            })
          }
        >
          <Image source={{ uri: loan.image }} style={styles.cover} />
          <View>
            <Text style={styles.title}>{loan.title}</Text>
            <Text style={styles.subtitle}>Retirado: {loan.dueDate}</Text>
            <Text style={styles.subtitle}>Devolvido: {loan.returnedAt}</Text>
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
    marginBottom: 12,
    elevation: 2,
    flexDirection: "row",
    gap: 12,
  },
  cover: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  title: { fontSize: 18, fontWeight: "700", color: "#222" },
  subtitle: { fontSize: 14, fontWeight: "500", color: "#555" },

  emptyContainer: { padding: 20, alignItems: "center" },
  emptyText: { color: "#555", fontSize: 16, fontWeight: "600" },
});
