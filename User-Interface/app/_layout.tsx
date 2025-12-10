import { AuthProvider } from "@/contexts/AuthContext";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "RacingSansOne-Regular": require("@/assets/fonts/RacingSansOne-Regular.ttf"),
  });

  // Bloqueia renderização até as fontes carregarem
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthProvider>
        <Stack initialRouteName="index">
          
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="accountSettings"
            options={{ headerTitle: "Voltar" }}
          />
          <Stack.Screen
            name="appSettings"
            options={{ headerTitle: "Voltar" }}
          />

          <Stack.Screen name="+not-found" />

          <Stack.Screen name="book" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
