import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { useReservedStore } from "../store/useReservedStore";

interface BookDetailsProps {
  book: {
    isbn: string;
    title: string;
    author: string;
    cover: string;
    description?: string;
  } | null;
  onReserve?: () => void;
}

export default function BookDetails({ book, onReserve }: BookDetailsProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addReserved, removeReserved, isReserved } = useReservedStore();

  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18 }}>Livro não encontrado.</Text>
      </View>
    );
  }

  const reserved = isReserved(book.isbn);

  const reservedPayload = {
    id: book.isbn,
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    image: book.cover,
  };

  const favorite = isFavorite(book.isbn);

  // mapeia para o formato esperado pela store de favoritos
  const favoritePayload = {
    id: book.isbn, // se sua store espera um id independente, usamos o isbn como id
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    image: book.cover,
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverWrapper}>
        <Image source={{ uri: book.cover }} style={styles.coverImage} />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>por {book.author}</Text>

        <View style={styles.line} />

        <Text style={styles.sectionTitle}>Sinopse</Text>
        <Text style={styles.description}>
          {book.description ?? "Sem descrição disponível."}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.favButton,
          { backgroundColor: favorite ? "#E91E63" : "#9C27B0" },
        ]}
        onPress={() =>
          favorite ? removeFavorite(book.isbn) : addFavorite(favoritePayload)
        }
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

      <TouchableOpacity
        style={[styles.favButton, { backgroundColor: "#8A2BE2" }]}
        onPress={() =>
          reserved ? removeReserved(book.isbn) : addReserved(reservedPayload)
        }
      >
        <Ionicons name="bookmark" size={24} color="#fff" />
        <Text style={styles.favText}>
          {reserved ? "Cancelar Reserva" : "Reservar Livro"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 20 },

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

  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 4 },

  author: { fontSize: 16, color: "#666", marginBottom: 10 },

  line: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9C27B0",
    marginBottom: 6,
  },

  description: { fontSize: 15, lineHeight: 21, color: "#444" },

  favButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    gap: 8,
  },

  favText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
