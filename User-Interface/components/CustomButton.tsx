import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonProps = {
  title: string;
  variant?: "outline" | "filled"; // tipo do botão
  color?: string; // cor principal
  onPress: () => void;
  style?: ViewStyle | ViewStyle[]; // <-- adiciona suporte a estilos externos
};

export default function CustomButton({
  title,
  variant = "outline",
  color = "#007bff",
  onPress,
  style, // <-- recebe o style
}: ButtonProps) {
  const isFilled = variant === "filled";

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isFilled ? color : "#fff",
          borderColor: color,
          borderWidth: isFilled ? 0 : 2,
        },
        style, // <-- aplica o estilo extra
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: isFilled ? "#fff" : color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
  },
});
