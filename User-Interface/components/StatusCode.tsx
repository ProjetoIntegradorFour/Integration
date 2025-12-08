import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

const STATUS_COLORS = [
  { color: "#00FF66", label: "Empréstimo atual" },
  { color: "#FFD700", label: "Próximo a devolução" },
  { color: "#FF3333", label: "Atrasado" },
  { color: "#3333FF", label: "Na fila de reserva" },
  { color: "#A020F0", label: "Disponível para retirada" },
  { color: "#00FFFF", label: "Disponível para empréstimo" },
];

interface StatusCodeProps {
  color?: string;
}

const StatusCode: React.FC<StatusCodeProps> = ({ color = "#00FF66" }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.dot, { backgroundColor: color }]}
      />

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.popup}>
            {STATUS_COLORS.map((item, index) => (
              <View key={index} style={styles.row}>
                <View
                  style={[styles.dot, { backgroundColor: item.color }]}
                />
                <Text style={styles.text}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: 6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    elevation: 6,
    width: 260,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  text: {
    marginLeft: 10,
    color: "#111",
    fontSize: 14,
  },
});

export default StatusCode;