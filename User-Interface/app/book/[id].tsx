import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import BookDetails from "../../components/BookDetails";
import { useBooksStore } from "../../store/useBooksStore";

export default function BookPage() {
  const { id } = useLocalSearchParams(); // id = isbn
  const { selectedBook, fetchBookByISBN, loading } = useBooksStore();

  useEffect(() => {
    if (id) fetchBookByISBN(String(id));
  }, [id]);

  return (
    <>
      <Stack.Screen
        options={{
          title: selectedBook?.title ?? "Livro",
        }}
      />

      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#9C27B0" />
        </View>
      )}

      {!loading && <BookDetails book={selectedBook} />}
    </>
  );
}
