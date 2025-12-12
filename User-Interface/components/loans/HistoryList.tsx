import { View, Text, Image } from "react-native";
import { useHistoryStore } from "../../store/useHistoryStore";

export default function HistoryList() {
  const history = useHistoryStore((s) => s.history);

  if (history.length === 0)
    return <Text>Nenhum histórico disponível.</Text>;

  return (
    <View style={{ gap: 16 }}>
      {history.map((b, index) => {
        const formattedDate = new Date(b.returnedAt).toLocaleDateString("pt-BR");

        return (
          <View key={index} style={{ flexDirection: "row", gap: 12 }}>
            <Image
              source={{ uri: b.image }}
              style={{ width: 60, height: 90, borderRadius: 4 }}
            />
            <View>
              <Text style={{ fontWeight: "700" }}>{b.title}</Text>
              <Text>{b.author}</Text>
              <Text style={{ marginTop: 4, opacity: 0.6 }}>
                Devolvido em {formattedDate}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
