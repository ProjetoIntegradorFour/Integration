import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// 👉 export do Book (pra você poder importar no index)
export interface Book {
  id: string;
  title: string;
  image: string;
  isbn: string;
}

interface CarouselProps {
  title: string;
  data: Book[];
  renderButton: (book: Book) => React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ title, data, renderButton }) => {
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < data.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={styles.title}>{title}</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => scrollToIndex(currentIndex - 1)}>
          <Ionicons name="chevron-back-circle" size={36} color="#9C27B0" />
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          keyExtractor={(item) => item.isbn}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/book/${item.isbn}`)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ marginTop: 8 }}>{renderButton(item)}</View>
            </TouchableOpacity>
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (width * 0.45 + 20)
            );
            setCurrentIndex(index);
          }}
        />

        <TouchableOpacity onPress={() => scrollToIndex(currentIndex + 1)}>
          <Ionicons name="chevron-forward-circle" size={36} color="#9C27B0" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9C27B0",
    marginLeft: 10,
    marginBottom: 20,
  },
  card: {
    width: width * 0.4,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },

  image: {
    width: "100%",
    aspectRatio: 0.8, // mantém proporção de livro
    borderRadius: 6,
    resizeMode: "contain",
    marginBottom: 6, // aproxima do botão
  },
});

export default Carousel;
