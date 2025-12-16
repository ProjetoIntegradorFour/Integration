import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Notification {
  id: string;
  type: "multa" | "reserva";
  title: string;
  bookTitle: string;
  message: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "multa",
    title: "Multa",
    bookTitle: "Eu, Robô",
    message:
      'O livro "Eu, Robô" está em atraso e sujeito a multa. Solicitamos que compareça à biblioteca para regularizar a pendência.',
  },
  {
    id: "2",
    type: "reserva",
    title: "Reserva",
    bookTitle: "O Ladrão de Raios",
    message:
      'O livro "O Ladrão de Raios" que estava reservado já está disponível para retirada. Favor comparecer à biblioteca para buscar o exemplar.',
  },
];

export default function NotificationScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Notificações</Text>

      {mockNotifications.map((notif) => (
        <View key={notif.id} style={styles.card}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Ionicons
              name={notif.type === "multa" ? "cash-outline" : "book-outline"}
              size={20}
              color="#9C27B0"
            />

            <Text style={styles.headerText}>
              {notif.title} -{" "}
              <Text style={styles.bookName}>{notif.bookTitle}</Text>
            </Text>
          </View>

          {/* Mensagem */}
          <Text style={styles.message}>{notif.message}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#9C27B0",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5D4F5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  headerText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },

  bookName: {
    color: "#9C27B0",
  },

  message: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    lineHeight: 20,
  },

  button: {
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#E91E63",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  buttonText: {
    color: "#E91E63",
    fontWeight: "600",
    fontSize: 13,
  },
});
