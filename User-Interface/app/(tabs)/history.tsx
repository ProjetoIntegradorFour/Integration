import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useLoanStore } from "../../store/useLoanStore";
import { useReservedStore } from "../../store/useReservedStore";
import { useHistoryStore } from "../../store/useHistoryStore";
import { useRouter } from "expo-router";

export default function HistoryScreen() {
  const [tab, setTab] = useState<"active" | "reserved" | "history">("active");

  const { loans } = useLoanStore();
  const { reserved } = useReservedStore();
  const { history } = useHistoryStore();

  const router = useRouter();

  const lists = {
    active: loans,
    reserved,
    history,
  };

  const renderCard = (item: any) => (
    <TouchableOpacity
      onPress={() => router.push(`/book/${item.isbn}`)}
      style={{
        backgroundColor: "white",
        padding: 12,
        marginVertical: 8,
        flexDirection: "row",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 70,
          height: 100,
          borderRadius: 8,
          marginRight: 12,
          backgroundColor: "#eee",
        }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ opacity: 0.6 }}>{item.author}</Text>

        {item.dueDate && !item.returnDate && (
          <Text style={{ marginTop: 6, color: "#9C27B0" }}>
            Devolução: {item.dueDate}
          </Text>
        )}

        {item.returnDate && (
          <Text style={{ marginTop: 6, color: "green" }}>
            Devolvido em: {item.returnDate}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fafafa", padding: 16 }}>
      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
        }}
      >
        {["active", "reserved", "history"].map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => setTab(key as any)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 20,
              backgroundColor: tab === key ? "#9C27B0" : "#E0E0E0",
            }}
          >
            <Text
              style={{
                color: tab === key ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {key === "active"
                ? "Ativos"
                : key === "reserved"
                ? "Reservados"
                : "Histórico"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={lists[tab]}
        keyExtractor={(item) => item.isbn}
        renderItem={({ item }) => renderCard(item)}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              opacity: 0.5,
              marginTop: 40,
              fontSize: 16,
            }}
          >
            Nada por aqui ainda...
          </Text>
        )}
      />
    </View>
  );
}
