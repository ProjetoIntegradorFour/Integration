import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";

export default function AppSettings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações do App</Text>

      {/* Notificações */}
      <View style={styles.section}>
        <View style={styles.item}>
          <Text style={styles.text}>Notificações</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
      </View>

      {/* Sobre o aplicativo */}
      <Text style={styles.subtitle}>Sobre o Aplicativo</Text>

      <View style={styles.aboutBox}>
        <Text style={styles.aboutText}>
          Este aplicativo foi desenvolvido para facilitar o acesso e gestão de
          informações da bibliotea pelos alunos do SENAI.
        </Text>

        <Text style={styles.aboutSmallTitle}>Autores</Text>
        <Text style={styles.author}>• Millena França</Text>
        <Text style={styles.author}>• Melina Saori</Text>
        <Text style={styles.author}>• Thomas Steinoff</Text>
        <Text style={styles.author}>• Guilherme Camargo</Text>
        <Text style={styles.author}>• Jõao</Text>

        <Text style={styles.version}>Versão 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
  },

  section: {
    marginBottom: 30,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  text: {
    fontSize: 16,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },

  aboutBox: {
    backgroundColor: "#F7F7FA",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  aboutText: {
    fontSize: 15,
    color: "#555",
    marginBottom: 15,
    lineHeight: 20,
  },

  aboutSmallTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  author: {
    fontSize: 15,
    color: "#444",
    marginBottom: 3,
  },

  version: {
    marginTop: 15,
    fontSize: 13,
    color: "#888",
  },
});
