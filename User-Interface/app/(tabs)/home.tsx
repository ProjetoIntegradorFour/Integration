import AuthorCarousel from "@/components/AuthorCarousel";
import Carousel from "@/components/Carousel";
import { ThemedText } from "@/components/ThemedText";

import { ActivityIndicator, ScrollView, View } from "react-native";
import { useEffect } from "react";
import { useBooksStore } from "@/store/useBooksStore";

export default function App() {
  const { books, fetchBooks, loading } = useBooksStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#9C27B0" />
      </View>
    );

  const carouselData = books.map((b) => ({
    id: b.isbn,
    title: b.title,
    image: b.cover,
    isbn: b.isbn,
  }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f9f9f9" }}
      contentContainerStyle={{ paddingVertical: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText>
        <View style={{ flex: 1, backgroundColor: "#f9f9f9", paddingTop: 0 }}>
          <Carousel
            title="Novidades"
            data={carouselData}
          />

          <AuthorCarousel
            title="Autores"
            authors={[
              { id: "1", name: "Clarice Lispector", image: "https://..." },
              { id: "2", name: "Agatha Christie", image: "https://..." },
              { id: "3", name: "Machado de Assis", image: "https://..." },
              { id: "4", name: "Carolina Maria de Jesus", image: "https://..." },
              { id: "5", name: "Cecília Meireles", image: "https://..." },
              { id: "6", name: "Monteiro Lobato", image: "https://..." },
              { id: "7", name: "Jorge Amado", image: "https://..." },
            ]}
            scrollSpeed={0.3}
            onAuthorPress={(a) => console.log("clicked", a)}
          />

          <Carousel
            title="Livros Populares"
            data={carouselData}
          />
        </View>
      </ThemedText>
    </ScrollView>
  );
}
