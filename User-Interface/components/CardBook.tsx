import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { router } from "expo-router";

export interface BookCardProps {
  isbn: string;
  title: string;
  author: string;
  coverUrl: string;
  availableCopies: number;
  nextAvailableDate?: string;
  userHasCopy?: boolean;
  userIsInWaitlist?: boolean;
  loanDueDate?: string;
}

export default function CardBook({
  isbn,
  title,
  author,
  coverUrl,
  availableCopies,
  nextAvailableDate,
  userHasCopy = false,
  userIsInWaitlist = false,
  loanDueDate,
}: BookCardProps) {
  const showNextAvailableDate = availableCopies === 0 && nextAvailableDate;
  const showLoanDueDate = userHasCopy && loanDueDate;
  const showWaitlistStatus = userIsInWaitlist && !userHasCopy;

  let buttonContent;

  if (userHasCopy) {
    buttonContent = (
      <View style={styles.statusChipPrimary}>
        <Text style={styles.statusText}>Cópia no seu nome</Text>
      </View>
    );
  } else if (availableCopies > 0) {
    buttonContent = (
      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => router.push(`/book/${isbn}`)}
      >
        <Text style={styles.buttonText}>Empréstimo</Text>
      </TouchableOpacity>
    );
  } else if (userIsInWaitlist) {
    buttonContent = (
      <View style={styles.statusChipSecondary}>
        <Text style={[styles.statusText, { color: "#9C27B0" }]}>
          Na fila de espera
        </Text>
      </View>
    );
  } else {
    buttonContent = (
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.push(`/book/${isbn}`)}
      >
        <Text style={[styles.buttonText, { color: "#9C27B0" }]}>
          Entrar na fila de espera
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/book/${isbn}`)}
    >
      <Image source={{ uri: coverUrl }} style={styles.cover} />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>

        {showLoanDueDate && (
          <Text style={[styles.date, { fontWeight: "bold" }]}>
            Devolução: {loanDueDate}
          </Text>
        )}

        {showWaitlistStatus && (
          <Text style={styles.date}>Status: Na fila de espera</Text>
        )}

        {showNextAvailableDate && (
          <Text style={styles.date}>
            Próxima devolução: {nextAvailableDate}
          </Text>
        )}

        <View style={styles.buttonContainer}>{buttonContent}</View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 12,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  author: {
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
  },
  date: {
    fontSize: 13,
    color: "#9C27B0",
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: 4,
  },
  buttonPrimary: {
    backgroundColor: "#9C27B0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#9C27B0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
  },
  statusChipPrimary: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusChipSecondary: {
    backgroundColor: "#F3E5F5",
    borderWidth: 1,
    borderColor: "#9C27B0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
  },
});
