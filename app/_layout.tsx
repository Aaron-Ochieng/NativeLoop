import "./globals.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        title: "",
        headerStyle: {
          backgroundColor: "#eff6ff",
        },
      }}
    />
  );
}
