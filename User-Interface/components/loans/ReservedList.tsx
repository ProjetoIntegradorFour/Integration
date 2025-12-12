import { View, Text, Image, TouchableOpacity } from "react-native";
import { useReservedStore } from "@/store/useReservedStore";
import { useLoanStore } from "@/store/useLoanStore";

export default function ReservedList() {
  const reserved = useReservedStore((s) => s.reserved);
  const removeReserved = useReservedStore((s) => s.removeReserved);
  const loanBook = useLoanStore((s) => s.loanBook);

  if (reserved.length === 0)
    return <Text>Nenhuma reserva.</Text>;

  return (
    <View style={{ gap: 16 }}>
      {reserved.map((b) => (
        <View key={b.isbn} style={{ flexDirection: "row", gap: 12 }}>
          <Image
            source={{ uri: b.image }}
            style={{ width: 60, height: 90, borderRadius: 4 }}
          />

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700" }}>{b.title}</Text>
            <Text>{b.author}</Text>

            <TouchableOpacity
              onPress={() => {
                // criar dueDate para empréstimo
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + 7); // devolução em 7 dias

                loanBook({
                  isbn: b.isbn,
                  title: b.title,
                  author: b.author,
                  image: b.image,
                  dueDate: dueDate.toISOString().split("T")[0], // YYYY-MM-DD
                });

                removeReserved(b.isbn);
              }}
            >
              <Text style={{ color: "green", marginTop: 6 }}>
                Mover para empréstimo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
