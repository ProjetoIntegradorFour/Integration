import { Image } from "react-native";
import AuthorCarousel from "@/components/AuthorCarousel";
import Carousel from "@/components/Carousel";
import { ThemedText } from "@/components/ThemedText";

import { ActivityIndicator, ScrollView, View } from "react-native";
import { useEffect } from "react";
import { useBooksStore } from "@/store/useBooksStore";

export default function App() {
  const { books, fetchBooks, loading } = useBooksStore();

  async function prefetchCovers(books: { cover: string }[]) {
    try {
      await Promise.all(books.map((b) => Image.prefetch(b.cover)));
      console.log("👍 Capas pré-carregadas");
    } catch (e) {
      console.log("⚠️ Erro no prefetch", e);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      prefetchCovers(books.slice(0, 20)); // pré-carrega só os primeiros
    }
  }, [books]);

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
          <Carousel title="Novidades" data={carouselData} />

          <AuthorCarousel
            title="Autores"
            authors={[
              {
                id: "1",
                name: "Clarice Lispector",
                image:
                  "https://s2-g1.glbimg.com/Qd0kwciwl1lqXDGDgZAdIl4J7cU=/0x0:1080x1920/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/1/y/fnGg8lTk6uZtxFAAd1vg/design-sem-nome-50-.png",
              },
              {
                id: "2",
                name: "Agatha Christie",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlh3TF-ng6bX8ip5gMkc9_Al4rjcGh4NYLA&s",
              },
              {
                id: "3",
                name: "Machado de Assis",
                image:
                  "https://s5.static.brasilescola.uol.com.br/be/2022/08/machado-assis.jpg",
              },
              {
                id: "4",
                name: "Carolina Maria de Jesus",
                image:
                  "https://s5.static.brasilescola.uol.com.br/be/2022/08/machado-assis.jpg",
              },
              {
                id: "5",
                name: "Cecília Meireles",
                image:
                  "https://s5.static.brasilescola.uol.com.br/be/2022/08/machado-assis.jpg",
              },
              {
                id: "6",
                name: "Monteiro Lobato",
                image:
                  "https://s5.static.brasilescola.uol.com.br/be/2022/08/machado-assis.jpg",
              },
              {
                id: "7",
                name: "Jorge Amado",
                image:
                  "https://s5.static.brasilescola.uol.com.br/be/2022/08/machado-assis.jpg",
              },
            ]}
            scrollSpeed={0.3}
            onAuthorPress={(a) => console.log("clicked", a)}
          />

          <Carousel title="Livros Populares" data={carouselData} />
        </View>
      </ThemedText>
    </ScrollView>
  );
}
