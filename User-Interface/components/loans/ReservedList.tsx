import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { useReservedStore } from "../../store/useReservedStore";

export default function ReservedList() {
  const { reserved } = useReservedStore();

  if (!reserved.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum livro reservado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {reserved.map((b) => (
        <TouchableOpacity
          key={b.isbn}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/book/[id]",
              params: { id: b.isbn },
            })
          }
        >
          <Image source={{ uri: b.image }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{b.title}</Text>
            <Text style={styles.subtitle}>{b.author}</Text>
            <Text style={styles.tag}>Reservado</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 85,
    borderRadius: 10,
    marginRight: 14,
  },
  title: { fontSize: 17, fontWeight: "700", color: "#222" },
  subtitle: { fontSize: 14, color: "#555", marginTop: 2 },
  tag: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#6C5CE710",
    color: "#6C5CE7",
    alignSelf: "flex-start",
    borderRadius: 8,
    fontWeight: "700",
    fontSize: 12,
  },
  emptyContainer: { padding: 20, alignItems: "center" },
  emptyText: { color: "#555", fontSize: 16, fontWeight: "600" },
});
