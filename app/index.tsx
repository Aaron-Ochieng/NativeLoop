import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();

  return (
    <View className="w-full h-full items-center justify-center px-8 bg-slate-900 ">
      <SafeAreaView />
      <Pressable
        onPress={() => router.navigate("/memory")}
        className="border w-full border-slate-600 dark:border-gray-slate-500 py-4 items-center justify-center rounded-xl"
      >
        <Text
          className="text-white text-xl"
          style={{ fontFamily: "JetBrainsMono_400Regular" }}
        >
          Memory
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.navigate("/loop")}
        className="border mt-4 w-full border-slate-600 dark:border-gray-slate-500 py-4 items-center justify-center rounded-xl"
      >
        <Text
          className="text-white text-xl"
          style={{ fontFamily: "JetBrainsMono_400Regular" }}
        >
          Loop
        </Text>
      </Pressable>
    </View>
  );
};

export default Index;
