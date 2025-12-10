import CardBook from "@/components/CardBook";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useReservedStore } from "@/store/useReservedStore";

export default function History() {
  const [activeBooks, setActiveBooks] = useState<any[]>([]);
  const [recentBooks, setRecentBooks] = useState<any[]>([]);
  const reservas = useReservedStore((state) => state.reserved);

  const [tab, setTab] = useState<"ativo" | "recentes" | "reservas">("ativo");

  useEffect(() => {
    // livros EMPRÉSTIMO ATIVO
    const mockAtivos = [
      {
        id: 1,
        title: "A Revolução dos Bichos",
        author: "George Orwell",
        isbn: "9780451526342",
        due_date: "2025-08-22",
        status: "ok",
      },
      {
        id: 2,
        title: "O Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "9780547928227",
        due_date: "2025-07-10",
        status: "due_soon",
      },
    ];

    // livros RECENTES (devolvidos recentemente)
    const mockRecentes = [
      {
        id: 3,
        title: "Dom Casmurro",
        author: "Machado de Assis",
        isbn: "9788594318600",
        due_date: "2025-06-01",
        status: "ok",
      },
      {
        id: 4,
        title: "O Pequeno Príncipe",
        author: "Antoine de Saint-Exupéry",
        isbn: "9780156012195",
        due_date: "2025-05-20",
        status: "ok",
      },
    ];

    setActiveBooks(mockAtivos);
    setRecentBooks(mockRecentes);
  }, []);

  // filtros de aba
  const filteredBooks =
    tab === "ativo"
      ? activeBooks
      : tab === "recentes"
        ? recentBooks
        : reservas;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f9f9", paddingTop: 50 }}>
      {/* ======================= ABAS ======================= */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          marginBottom: 25,
        }}
      >
        {["ativo", "recentes", "reservas"].map((v) => (
          <TouchableOpacity
            key={v}
            onPress={() => setTab(v as any)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: tab === v ? "#8A2BE2" : "#cccccc",
              backgroundColor: tab === v ? "#8A2BE2" : "white",
            }}
          >
            <Text style={{ color: tab === v ? "white" : "#333" }}>{v}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ======================= LISTA ======================= */}
      {filteredBooks.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ color: "#666", fontSize: 16 }}>
            Nenhum livro encontrado aqui.
          </Text>
        </View>
      ) : (
        filteredBooks.map((book) => {
          const coverUrl =
            book.image ??
            `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

          return (
            <CardBook
              key={book.id || book.isbn}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              coverUrl={coverUrl}
              dueDate={book.due_date}
              status={book.status}
            />
          );
        })
      )}
    </ScrollView>
  );
}
