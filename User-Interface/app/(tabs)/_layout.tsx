import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TabLayout() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!user) {
      router.replace("./index");
    }
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        headerShown: true,
        headerTitle: "",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#8BC34A",
        },
        headerStyle: {
          backgroundColor: "#8BC34A",
        },
        headerLeft: () => (
          <>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 40, height: 40, marginLeft: 15, borderRadius: 5 }}
              resizeMode="contain"
            />
            <ThemedText
              style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}
            >
              SENAI
            </ThemedText>
          </>
        ),
        headerRight: () => (
          <>
            <Pressable
              onPress={() => router.push("/notification")}
              style={({ pressed }) => ({
                marginRight: 30,
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <FontAwesome
                name="bell-o"
                size={24}
                color={Colors[colorScheme ?? "dark"].tint}
              />
            </Pressable>
            <Pressable
              onPress={() => router.push("/favorite")}
              style={({ pressed }) => ({
                marginRight: 30,
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <FontAwesome
                name="heart-o"
                size={24}
                color={Colors[colorScheme ?? "dark"].tint}
              />
            </Pressable>
          </>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />

      {/* favorite.tsx e notification.tsx não inclusos */}

      <Tabs.Screen
        name="favorite"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="notification"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
