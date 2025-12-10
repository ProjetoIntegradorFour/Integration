import { View, Text, StyleSheet } from "react-native";

export default function AccountSettings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações da Conta</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>tominhasoioi@gmail.com</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>(15) 99762-6673</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>Bloqueada</Text>

      {/* Ex: botão alterar senha */}
      {/* Ou outro conteúdo futuramente */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { marginTop: 15, fontWeight: "600" },
  value: { fontSize: 15, color: "#444" },
});
