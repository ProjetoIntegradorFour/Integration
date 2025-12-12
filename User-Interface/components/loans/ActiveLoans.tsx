import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useLoanStore } from "../../store/useLoanStore";

export default function ActiveLoans() {
  const { loans } = useLoanStore();

  if (!loans.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum empréstimo ativo.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loans.map((loan) => (
        <TouchableOpacity
          key={loan.isbn}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/book/[id]",
              params: { id: loan.isbn },
            })
          }
        >
          <Text style={styles.title}>{loan.title}</Text>
          <Text style={styles.subtitle}>Autor: {loan.author}</Text>
          <Text style={styles.subtitle}>
            Devolver até: {loan.dueDate ?? "—"}
          </Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: "#222",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },

  emptyContainer: { padding: 20, alignItems: "center" },
  emptyText: { color: "#555", fontSize: 16, fontWeight: "600" },
});
