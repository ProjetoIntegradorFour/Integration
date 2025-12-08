import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useFavoritesStore } from "../../store/useFavoritesStore";

export default function FavoriteScreen() {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "#555" }}>
          Você ainda não tem livros favoritos 💜
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={() => router.push(`/book/${item.id}`)}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 60, height: 90, borderRadius: 6, marginRight: 12 }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {item.title}
            </Text>
            {item.author && (
              <Text style={{ color: "#777", marginTop: 2 }}>{item.author}</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
