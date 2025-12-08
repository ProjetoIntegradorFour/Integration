import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavoritesStore } from "../store/useFavoritesStore";

export default function BookDetails({ book }: any) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18 }}>Livro não encontrado.</Text>
      </View>
    );
  }

  const favorite = isFavorite(book.id);

  return (
    <View style={styles.container}>
      {/* Moldura da imagem */}
      <View style={styles.coverWrapper}>
        <Image source={{ uri: book.cover }} style={styles.coverImage} />
      </View>

      {/* Info ao lado */}
      <View style={styles.infoBox}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>por {book.author}</Text>

        <View style={styles.line} />

        <Text style={styles.sectionTitle}>Sinopse</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>

      {/* Botão de favoritar */}
      <TouchableOpacity
        style={[
          styles.favButton,
          { backgroundColor: favorite ? "#E91E63" : "#9C27B0" },
        ]}
        onPress={() => (favorite ? removeFavorite(book.id) : addFavorite(book))}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={24}
          color="#fff"
        />
        <Text style={styles.favText}>
          {favorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },

  // Moldura bonita da capa
  coverWrapper: {
    width: 160,
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignSelf: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },

  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },

  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },

  line: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9C27B0",
    marginBottom: 6,
  },

  description: {
    fontSize: 15,
    lineHeight: 21,
    color: "#444",
  },

  favButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    gap: 8,
  },

  favText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
