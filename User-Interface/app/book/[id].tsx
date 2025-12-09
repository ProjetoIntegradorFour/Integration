import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useBooksStore } from "../../store/useBooksStore";
import { View, ActivityIndicator } from "react-native";
import BookDetails from "../../components/BookDetails";

export default function BookPage() {
  const { id } = useLocalSearchParams(); // isbn
  const { fetchBook, loading } = useBooksStore();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    if (id) fetchBook(String(id)).then(setBook);
  }, [id]);

  if (loading || !book)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#9C27B0" />
      </View>
    );

  return <BookDetails book={book} />;
}
