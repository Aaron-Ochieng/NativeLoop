import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const LoopGame = () => {
  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2500,
        easing: Easing.linear,
      }),
      -1, // infinite
      false,
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="bg-slate-900 items-center justify-center w-full h-full">
      <AnimatedIcon
        name="settings-outline"
        size={65}
        color="white"
        style={animatedStyle}
      />
      <Text
        className="text-xl mt-4 text-black dark:text-gray-100"
        style={{ fontFamily: "JetBrainsMono_400Regular" }}
      >
        Page under development
      </Text>
    </View>
  );
};
export default LoopGame;
