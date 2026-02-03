import { Sun } from "lucide-react-native";
import "./globals.css";
import { Stack } from "expo-router";
import { Pressable } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
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
    />
  );
}
