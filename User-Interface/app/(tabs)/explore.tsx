import Carousel from "@/components/Carousel";
import CategoryMenu from "@/components/CategoryMenu";
import CustomButton from "@/components/CustomButton";
import { useBooksStore } from "@/store/useBooksStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Explore() {
  const { books, fetchBooks, searchBooks, loading } = useBooksStore();

  useEffect(() => {
    fetchBooks();
  }, []);
  const [menuVisible, setMenuVisible] = useState(false);
  const [query, setQuery] = useState("");

  async function handleSearch(text: string) {
    setQuery(text);
    await searchBooks(text);
  }

  const carouselData = books.map((b) => ({
    id: b.isbn,
    title: b.title,
    image: b.cover,
    isbn: b.isbn,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <CategoryMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          onSelect={(cat) => console.log("Categoria escolhida:", cat)}
        />

        <View style={styles.row}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons
              name="menu-outline"
              size={32}
              color="#9C27B0"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <TextInput
              placeholder="pesquise aqui..."
              value={query}
              onChangeText={handleSearch}
              placeholderTextColor="#9C27B0"
              style={styles.input}
            />
            <Ionicons
              name="search-outline"
              size={20}
              color="#9C27B0"
              style={styles.searchIcon}
            />
          </View>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#f9f9f9" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Carousel
            title="Livros Clássicos"
            data={carouselData}
            renderButton={(book) => (
              <CustomButton
                title="RENOVAR"
                variant="outline"
                color="#007bff"
                onPress={() => console.log("Reservou", book.title)}
              />
            )}
          />
          <Carousel
            title="Apostilas"
            data={carouselData}
            renderButton={(book) => (
              <CustomButton
                title="RENOVAR"
                variant="outline"
                color="#007bff"
                onPress={() => console.log("Reservou", book.title)}
              />
            )}
          />
          <Carousel
            title="Ciência Política"
            data={carouselData}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#9C27B0",
    borderRadius: 12,
    marginLeft: 10,
    paddingHorizontal: 12,
    height: 42,
    width: "80%",
  },
  headerBox: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginBottom: 20,

    // sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // sombra Android
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 6,
  },
  searchIcon: {
    marginLeft: 6,
  },
  content: { gap: 25 },
});
