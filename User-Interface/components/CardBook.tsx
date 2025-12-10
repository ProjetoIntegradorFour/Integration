import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface CardBookProps {
  title: string;
  author: string;
  coverUrl: string;
  isbn: string;
  dueDate?: string;
  status?: "ok" | "late" | "due_soon"; 
}

export default function CardBook({
  title,
  author,
  coverUrl,
  isbn,
  dueDate,
  status = "ok",
}: CardBookProps) {

  const getStatusColor = () => {
    switch (status) {
      case "late":
        return "#E53935";
      case "due_soon":
        return "#FB8C00";
      default:
        return "#4CAF50";
    }
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/book/${isbn}`)}
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginBottom: 14,
        padding: 12,
        borderRadius: 12,
        elevation: 2,
        gap: 12,
        borderWidth: 1,
        borderColor: "#8A2BE2",
      }}
    >
      {/* CAPA */}
      <Image
        source={{ uri: coverUrl }}
        style={{
          width: 70,
          height: 100,
          borderRadius: 8,
        }}
      />

      {/* INFO */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#333" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>
          {author}
        </Text>

        {/* STATUS / DATA */}
        {dueDate && (
          <View>
            <Text style={{ fontSize: 13, color: "#777" }}>Devolução:</Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: getStatusColor(),
              }}
            >
              {dueDate}
              {status === "due_soon" && " - Devolva em breve"}
              {status === "late" && " - Atrasado"}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

