import AuthorCarousel from "@/components/AuthorCarousel";
import Carousel from "@/components/Carousel";
import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { useBooksStore } from "@/store/useBooksStore";
import { ScrollView, View } from "react-native";

export default function App() {
  const { books, fetchBooks } = useBooksStore();
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
            data={books}
            renderButton={(book) => (
              <CustomButton
                title="RENOVAR"
                variant="outline"
                color="#007bff"
                onPress={() => console.log("Reservou", book.title)}
              />
            )}
          />
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
            scrollSpeed={0.3} // 👈 controla a velocidade (menor = mais devagar, tipo 0.1 ~ 0.5)
            onAuthorPress={(a) => console.log("clicked", a)}
          />

          <Carousel
            title="Livros Populares"
            data={books}
            renderButton={(book) => (
              <CustomButton
                title="RENOVAR"
                variant="outline"
                color="#007bff"
                onPress={() => console.log("Reservou", book.title)}
              />
            )}
          />
        </View>
      </ThemedText>
    </ScrollView>
  );
}
