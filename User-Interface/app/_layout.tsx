import { AuthProvider } from "@/contexts/AuthContext";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useEffect } from "react";
import "react-native-reanimated";

import { requestNotificationPermission } from "@/services/notifications";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    "Roboto-Medium": require("@/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("@/assets/fonts/Roboto-Bold.ttf"),
    "RacingSansOne-Regular": require("@/assets/fonts/RacingSansOne-Regular.ttf"),
  });

  // Solicita permissão de notificação ao iniciar o app
  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
          <Stack.Screen
            name="book/[id]"
            options={{ headerTitle: "Voltar" }}
          />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="book" options={{ headerShown: false }} />
          <Stack.Screen name="loans" options={{ headerShown: false }} />
          <Stack.Screen
            name="book/status"
            options={{ headerTitle: "Voltar" }}
          />
        </Stack>
      </AuthProvider>

      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
