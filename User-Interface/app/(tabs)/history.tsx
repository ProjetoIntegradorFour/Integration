import CardBook from "@/components/CardBook";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useReservedStore } from "@/store/useReservedStore";

export default function History() {
  const [books, setBooks] = useState<any[]>([]);
  const [tab, setTab] = useState<"ativo" | "recentes" | "reservas">("ativo");
  const reservas = useReservedStore((state) => state.reserved);


  useEffect(() => {
    const mockBooks = [
      {
        id: 1,
        title: "Percy Jackson e o Ladrão de Raios",
        author: "Rick Riordan",
        isbn: "9788598078355",
        due_date: "2025-08-22",
        status: "ok",
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        isbn: "9788535909555",
        due_date: "2025-07-10",
        status: "late",
      },
    ];
    setBooks(mockBooks);
  }, []);

  // filtros de  aba
  const filteredBooks =
    tab === "ativo"
      ? books
      : tab === "recentes"
        ? books.slice(0, 1)
        : reservas;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f9f9", paddingTop: 50 }}>

      {/* ======================= ABAS ======================= */}
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10, marginBottom: 25 }}>

        <TouchableOpacity
          onPress={() => setTab("ativo")}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: tab === "ativo" ? "#8A2BE2" : "#cccccc",
            backgroundColor: tab === "ativo" ? "#8A2BE2" : "white",
          }}
        >
          <Text style={{ color: tab === "ativo" ? "white" : "#333" }}>ativo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab("recentes")}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: tab === "recentes" ? "#8A2BE2" : "#cccccc",
            backgroundColor: tab === "recentes" ? "#8A2BE2" : "white",
          }}
        >
          <Text style={{ color: tab === "recentes" ? "white" : "#333" }}>recentes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab("reservas")}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: tab === "reservas" ? "#8A2BE2" : "#cccccc",
            backgroundColor: tab === "reservas" ? "#8A2BE2" : "white",
          }}
        >
          <Text style={{ color: tab === "reservas" ? "white" : "#333" }}>reservas</Text>
        </TouchableOpacity>

      </View>
      {/* ==================================================== */}
      {filteredBooks.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: "#666", fontSize: 16 }}>
            Nenhum livro encontrado aqui.
          </Text>
        </View>
      ) : (
        filteredBooks.map((book) => (
          <CardBook
            key={book.id}
            title={book.title}
            author={book.author}
            isbn={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
            dueDate={book.due_date}
            status={book.status}
            onRenew={() => console.log(`Renovar ${book.title}`)}
          />
        ))
      )}

    </ScrollView>
  );
}