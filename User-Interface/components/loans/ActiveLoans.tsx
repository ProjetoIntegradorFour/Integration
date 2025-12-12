import { View, Text, Image, TouchableOpacity } from "react-native";
import { useLoanStore } from "@/store/useLoanStore";

export default function ActiveLoans() {
  const loans = useLoanStore((s) => s.loans);
  const returnBook = useLoanStore((s) => s.returnBook);

  if (loans.length === 0)
    return <Text>Nenhum empréstimo ativo.</Text>;

  return (
    <View style={{ gap: 16 }}>
      {loans.map((b) => (
        <View
          key={b.isbn}
          style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
        >
          <Image
            source={{ uri: b.image }}
            style={{ width: 60, height: 90, borderRadius: 4 }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700" }}>{b.title}</Text>
            <Text>{b.author}</Text>

            <TouchableOpacity onPress={() => returnBook(b.isbn)}>
              <Text style={{ color: "blue", marginTop: 6 }}>Devolver</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
