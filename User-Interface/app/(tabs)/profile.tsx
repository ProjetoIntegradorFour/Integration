import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();

  const user = {
    name: "Thomas Venturelli da Silva",
    email: "tominhasoioi@gmail.com",
    phone: "(15) 99762-6673",
    status: "Bloqueada",
    multa: true,
    avatar: require("@/assets/images/gatoserio.jpg"),
  };

  const handleLogout = async () => {
    await logout();
    router.replace("./index");
  };

  return (
    <View style={styles.container}>
      {/* Card do usuário */}
      <View style={styles.card}>
        <View style={styles.row}>
          {/* Foto + botão alinhados */}
          <View style={styles.avatarContainer}>
            <Image source={user.avatar} style={styles.avatar} />
            <CustomButton
              title="Alterar Foto"
              variant="filled"
              color="#8000ff"
              onPress={() => console.log("Alterar Foto")}
              style={styles.smallButton}
            />
          </View>

          {/* Informações do usuário */}
          <View style={styles.info}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.phone}>{user.phone}</Text>

            <View style={styles.statusContainer}>
              <Text style={styles.status}>
                Status da conta:{" "}
                <Text style={styles.blocked}>{user.status}</Text>
              </Text>
              {user.multa && <Text style={styles.multa}>Multa pendente</Text>}
            </View>
          </View>
        </View>
      </View>

      {/* Opções abaixo */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="settings-outline" size={22} color="#444" />
          <Text style={styles.optionText}>Configurações do App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="person-outline" size={22} color="#444" />
          <Text style={styles.optionText}>Configurações da Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.logout]}
          onPress={handleLogout}
        >
          <Ionicons name="exit-outline" size={22} color="#e53935" />
          <Text style={[styles.optionText, { color: "#e53935" }]}>
            Sair da Conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
  },
  card: {
    borderWidth: 1.5,
    borderColor: "#9C27B0",
    borderRadius: 12,
    padding: 15,
    width: "90%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 45,
    marginBottom: 6,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  phone: {
    fontSize: 15,
    marginTop: 2,
  },
  statusContainer: {
    marginTop: 10,
  },
  status: {
    fontWeight: "bold",
    fontSize: 14,
  },
  blocked: {
    color: "red",
  },
  multa: {
    color: "red",
    marginTop: 2,
    fontSize: 14,
  },
  options: {
    marginTop: "43%",
    width: "90%",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  logout: {
    marginTop: 5,
    borderBottomWidth: 0,
  },
  smallButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: 0,
    marginTop: 8,
    alignSelf: "center",
  },
});
