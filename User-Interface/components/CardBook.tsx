import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import StatusCode from "./StatusCode";

interface BookCardProps {
  title: string;
  author: string;
  isbn: string;
  dueDate: string;
  status: "current" | "near" | "late" | "queue" | "pickup" | "available";
  onRenew: () => void;
}

const STATUS_COLORS: Record<BookCardProps["status"], string> = {
  current: "#00FF66",
  near: "#FFD700",
  late: "#FF3333",
  queue: "#3333FF",
  pickup: "#A020F0",
  available: "#00FFFF",
};

const CardBook: React.FC<BookCardProps> = ({
  title,
  author,
  isbn,
  dueDate,
  status,
  onRenew,
}) => {
  const isLate = status === "late";

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        <Text style={[styles.dueDate, isLate && styles.dueLate]}>
          {isLate ? "Devolução atrasada" : "Devolução até " + dueDate}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <StatusCode color={STATUS_COLORS[status]} />
        <CustomButton
          title="RENOVAR"
          variant="outline"
          color="#007bff"
          onPress={onRenew}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#a020f0",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "flex-start", // deixa o topo alinhado
  },
  image: {
    width: 60,
    height: 90,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  rightSection: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    minHeight: 90, // mesmo da imagem pra alinhar verticalmente
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    flexShrink: 1,
  },
  author: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
    color: "#333",
  },
  dueLate: {
    color: "red",
    fontWeight: "600",
  },
});

export default CardBook;
