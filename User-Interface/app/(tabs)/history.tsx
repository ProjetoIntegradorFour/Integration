import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useLoanStore } from "../../store/useLoanStore";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryPage() {
  const { loans, returnBook } = useLoanStore();

  const handleReturn = (isbn: string) => {
    returnBook(isbn);
  };

  const renderLoanItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cover} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.due}>Devolver até: {item.dueDate}</Text>

        <TouchableOpacity
          style={styles.returnButton}
          onPress={() => handleReturn(item.isbn)}
        >
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.returnText}>Devolver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Empréstimos Ativos</Text>

      {loans.length === 0 ? (
        <Text style={styles.empty}>Você não tem livros emprestados.</Text>
      ) : (
        <FlatList
          data={loans}
          renderItem={renderLoanItem}
          keyExtractor={(item) => item.isbn}
        />
      )}

      <View style={{ height: 20 }} />

      <Text style={styles.sectionTitle}>Histórico</Text>
      <Text style={styles.emptySecondary}>
        O histórico ainda não está habilitado no sistema.
      </Text>
      <Text style={styles.emptyHint}>
        (Posso ativar quando quiser, é só pedir 😉)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fafafa" },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#9C27B0",
    marginBottom: 10,
  },

  empty: {
    fontSize: 15,
    color: "#999",
    marginBottom: 20,
  },

  emptySecondary: {
    fontSize: 15,
    color: "#777",
  },

  emptyHint: {
    fontSize: 13,
    color: "#aaa",
    fontStyle: "italic",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    gap: 12,
  },

  cover: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#eee",
  },

  title: { fontSize: 16, fontWeight: "bold", color: "#333" },
  author: { fontSize: 14, color: "#666" },

  due: {
    marginTop: 4,
    fontSize: 14,
    color: "#D32F2F",
    fontWeight: "600",
  },

  returnButton: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#9C27B0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },

  returnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
