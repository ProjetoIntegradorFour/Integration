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
    avatar:
      "https://st4.depositphotos.com/4046139/19878/i/1600/depositphotos_198781686-stock-photo-happy-little-boy-at-school.jpg",
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Card do usuário */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </View>

          {/* Informações do usuário */}
          <View style={styles.info}>
            <Text style={styles.name}>{user.name}</Text>

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
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/appSettings")}
        >
          <Ionicons name="settings-outline" size={22} color="#444" />
          <Text style={styles.optionText}>Configurações do App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("/accountSettings")}
        >
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
    backgroundColor: "#F5F5F7",
    alignItems: "center",
    paddingTop: 40,
  },

  card: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarContainer: {
    alignItems: "center",
    marginRight: 18,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  email: {
    marginTop: 4,
    color: "#6A5ACD",
    fontSize: 15,
    textDecorationLine: "underline",
  },

  phone: {
    fontSize: 15,
    marginTop: 4,
    color: "#444",
  },

  statusContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#FBE9E7",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#E53935",
  },

  status: {
    fontWeight: "600",
    fontSize: 14,
    color: "#444",
  },

  blocked: {
    color: "#D32F2F",
    fontWeight: "700",
  },

  multa: {
    color: "#C62828",
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
  },

  options: {
    marginTop: 40,
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  logout: {
    borderBottomWidth: 0,
  },
});
