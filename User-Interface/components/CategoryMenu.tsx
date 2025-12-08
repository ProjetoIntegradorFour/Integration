import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
};

const categories = [
  "Apostilas",
  "Artes",
  "Auto Ajuda",
  "Biografias",
  "Ciência Política",
  "Comunicação",
  "História Geral",
  "Literatura Clássica",
  "Literatura Estrangeira",
  "Psicologia",
  "Ver Todas As Categorias",
];

export default function CategoryMenu({ visible, onClose, onSelect }: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.menuBox}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.item}
              onPress={() => {
                onSelect(cat);
                onClose();
              }}
            >
              <Text style={styles.itemText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "flex-start",
    paddingTop: 102, // aparece logo abaixo do header
  },
  menuBox: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginLeft: 15,
    width: 220,

    // sombra iOS + Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    paddingVertical: 6,
  },
  itemText: {
    fontSize: 15,
    color: "#9C27B0",
    fontWeight: "500",
  },
});
