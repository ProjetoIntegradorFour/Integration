import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Imports do REANIMATED
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Author = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  title?: string;
  authors: Author[];
  scrollSpeed?: number; // Não será mais usado diretamente, mas mantido
  onAuthorPress?: (author: Author) => void;
};

const ITEM_WIDTH = 110;
const SPACING = 10;
const TOTAL_WIDTH = ITEM_WIDTH + SPACING;

export default function AuthorCarousel({
  title = "Autores",
  authors,
  onAuthorPress,
}: Props) {
  // Usamos useSharedValue do Reanimated para o valor animado
  const translateX = useSharedValue(0);

  // Duplicar para loop infinito
  const loopData = [...authors, ...authors];
  const contentWidth = authors.length * TOTAL_WIDTH;

  useEffect(() => {
    // Definimos a duração da animação com base na largura do conteúdo
    const animationDuration = (contentWidth / 35) * 1000; // 35px por segundo

    // Iniciamos a animação de repetição infinita
    translateX.value = withRepeat(
      withTiming(-contentWidth, {
        // Mova para a esquerda pelo tamanho total da lista original
        duration: animationDuration,
        easing: Easing.linear,
      }),
      -1, // -1 significa repetição infinita
      false // Não inverte a direção
    );

    return () => {
      // Limpa a animação quando o componente desmonta
      cancelAnimation(translateX);
    };
  }, [authors, contentWidth]);

  // Aplica o estilo animado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={{ overflow: "hidden" }}>
        <Animated.View
          style={[styles.listContainer, animatedStyle]} // Aplica o estilo animado aqui
        >
          {loopData.map((item, index) => (
            <TouchableOpacity
              key={index} // Use key={index} ou item.id, mas index é mais fácil aqui
              style={styles.item}
              onPress={() => onAuthorPress?.(item)}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (seus estilos existentes)
  container: { marginTop: 20, paddingHorizontal: 20, marginBottom: 25 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9C27B0",
    marginLeft: -8,
    marginBottom: 20,
  },
  listContainer: {
    // Novo estilo para o View animado
    flexDirection: "row",
  },
  item: {
    width: ITEM_WIDTH,
    marginRight: SPACING,
    alignItems: "center",
  },
  image: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#eee",
    marginBottom: 6,
  },
  name: { fontSize: 13, width: ITEM_WIDTH, textAlign: "center" },
});
