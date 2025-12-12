import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { useFavoritesStore } from "../store/useFavoritesStore";
import { useReservedStore } from "../store/useReservedStore";
import { useLoanStore } from "../store/useLoanStore";

export default function BookDetails({ book }: any) {
  if (!book) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18 }}>Livro não encontrado.</Text>
      </View>
    );
  }

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const {
    reserved,
    addReserved,
    removeReserved,
    isReserved,
  } = useReservedStore();

  const {
    loans,
    loanBook,
    returnBook,
    isLoaned,
  } = useLoanStore();

  // ============================
  //   STATUS REAL DO LIVRO
  // ============================
  const userHasCopy = isLoaned(book.isbn);
  const userIsInWaitlist = isReserved(book.isbn);

  const favoritePayload = {
    id: book.isbn,
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    image: book.cover,
  };

  // Cálculo das cópias na UI
  const adjustedCopies = userHasCopy
    ? Math.max(book.availableCopies - 1, 0)
    : book.availableCopies;

  // ============================
  //        AÇÕES
  // ============================
  function handleLoan() {
    const date = new Date();
    date.setDate(date.getDate() + 7);

    const formatted = date.toLocaleDateString("pt-BR");

    loanBook({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      image: book.cover,
      dueDate: formatted,
    });

    removeReserved(book.isbn);
  }

  function handleReturn() {
    returnBook(book.isbn);
  }

  function handleWaitlist() {
    addReserved({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      image: book.cover,
    });
  }

  function handleCancelWaitlist() {
    removeReserved(book.isbn);
  }

  // ============================
  //  BOTÃO PRINCIPAL CONFIG
  // ============================
  let mainButton;

  if (userHasCopy) {
    mainButton = (
      <View style={[styles.actionBox, styles.statusActive]}>
        <Text style={styles.actionTextPrimary}>Cópia no seu nome</Text>

        <Text style={styles.actionTextSecondary}>
          Devolução até: {loans.find((l) => l.isbn === book.isbn)?.dueDate}
        </Text>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleReturn}
        >
          <Text style={styles.cancelButtonText}>Devolver Livro</Text>
        </TouchableOpacity>
      </View>
    );
  } 
  
  else if (adjustedCopies > 0) {
    mainButton = (
      <TouchableOpacity
        style={[styles.actionButton, styles.buttonPrimary]}
        onPress={handleLoan}
      >
        <Ionicons name="book" size={22} color="#fff" />
        <Text style={styles.actionButtonText}>Empréstimo</Text>
      </TouchableOpacity>
    );
  } 
  
  else if (userIsInWaitlist) {
    mainButton = (
      <View style={[styles.actionBox, styles.statusWaitlist]}>
        <Text style={styles.actionTextWaitlist}>Na fila de espera</Text>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelWaitlist}
        >
          <Text style={styles.cancelButtonText}>Cancelar Espera</Text>
        </TouchableOpacity>
      </View>
    );
  } 
  
  else {
    mainButton = (
      <TouchableOpacity
        style={[styles.actionButton, styles.buttonSecondary]}
        onPress={handleWaitlist}
      >
        <Ionicons name="hourglass-outline" size={22} color="#9C27B0" />
        <Text style={styles.actionButtonTextSecondary}>Entrar na fila</Text>
      </TouchableOpacity>
    );
  }

  // ============================

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f9f9f9" }}
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <View style={styles.container}>
        <View style={styles.coverWrapper}>
          <Image source={{ uri: book.cover }} style={styles.coverImage} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>por {book.author}</Text>

          <Text style={styles.statusInfoText}>
            Cópias disponíveis: {adjustedCopies}
          </Text>

          <View style={styles.line} />

          <Text style={styles.sectionTitle}>Sinopse</Text>
          <Text style={styles.description}>
            {book.description || "Sem descrição disponível."}
          </Text>
        </View>

        <View style={styles.mainActionWrapper}>{mainButton}</View>

        <TouchableOpacity
          style={[
            styles.utilityButton,
            { backgroundColor: isFavorite(book.isbn) ? "#E91E63" : "#9C27B0" },
          ]}
          onPress={() =>
            isFavorite(book.isbn)
              ? removeFavorite(book.isbn)
              : addFavorite(favoritePayload)
          }
        >
          <Ionicons
            name={isFavorite(book.isbn) ? "heart" : "heart-outline"}
            size={22}
            color="#fff"
          />
          <Text style={styles.utilityText}>
            {isFavorite(book.isbn)
              ? "Remover dos Favoritos"
              : "Adicionar aos Favoritos"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ============================
//           STYLES
// ============================

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 20, gap: 20 },

  coverWrapper: {
    width: 160,
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignSelf: "center",
    padding: 10,
    elevation: 6,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#333" },
  author: { fontSize: 16, color: "#666", marginBottom: 10 },

  statusInfoText: {
    fontSize: 14,
    color: "#9C27B0",
    marginBottom: 4,
    fontWeight: "600",
  },

  line: { height: 1, backgroundColor: "#ddd", marginVertical: 10 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9C27B0",
  },
  description: { fontSize: 15, lineHeight: 21, color: "#444" },

  mainActionWrapper: { marginTop: 0 },

  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtonTextSecondary: {
    color: "#9C27B0",
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonPrimary: { backgroundColor: "#9C27B0" },
  buttonSecondary: {
    backgroundColor: "#F3E5F5",
    borderWidth: 2,
    borderColor: "#9C27B0",
  },

  actionBox: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  statusActive: {
    backgroundColor: "#E8F5E9",
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
  statusWaitlist: {
    backgroundColor: "#F3E5F5",
    borderWidth: 2,
    borderColor: "#9C27B0",
  },

  actionTextPrimary: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  actionTextSecondary: {
    marginTop: 4,
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
  },
  actionTextWaitlist: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9C27B0",
  },

  cancelButton: { marginTop: 8 },
  cancelButtonText: {
    color: "#E91E63",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  utilityButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    gap: 8,
  },
  utilityText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
