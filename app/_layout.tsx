import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono/400Regular";
import { useFonts } from "@expo-google-fonts/jetbrains-mono/useFonts";
import { Stack } from "expo-router";
import { Sun } from "lucide-react-native";
import { Pressable } from "react-native";
import "./globals.css";
import { SQLiteProvider } from "expo-sqlite";
import { DATABASE_NAME, migrateDbIfNeeded } from "@/db/database";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Suspense } from "react";
import SyncOnStart from "@/components/sync-on-start";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({ JetBrainsMono_400Regular });
  if (!fontsLoaded) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={null}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          onInit={migrateDbIfNeeded}
          useSuspense
        >
          <SyncOnStart />
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
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
}
