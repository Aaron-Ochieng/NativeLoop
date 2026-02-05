import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono/400Regular";
import { useFonts } from "@expo-google-fonts/jetbrains-mono/useFonts";
import { Stack } from "expo-router";
import { Sun } from "lucide-react-native";
import { Pressable } from "react-native";
import "./globals.css";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({ JetBrainsMono_400Regular });
  if (!fontsLoaded) return null;
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        title: "",
        headerStyle: {
          backgroundColor: "#eff6ff",
        },
        headerRight: () => (
          <Pressable className="mr-4">
            <Sun color="gray" />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="memory" />
      <Stack.Screen name="loop" />
    </Stack>
  );
}
