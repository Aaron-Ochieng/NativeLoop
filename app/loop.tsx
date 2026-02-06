import { Text, useWindowDimensions, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { gameLoop } from "@/loops/gameLoop";
import { SendHorizonal, Star } from "lucide-react-native";
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const LoopGame = () => {
  const { width } = useWindowDimensions();
  const sz = Math.round(width / 12);
  const size = `size-[${sz - 4}]`;
  console.log(size);
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
      <View className="">
        {gameLoop.map((v, key) => (
          <View key={key} className="flex-row">
            {v.map((v, key) => (
              <View
                key={key}
                className={`size-[30] m-[1px] rounded-lg items-center justify-center  ${v.c === "purple" ? "bg-indigo-600" : v.c === "red" ? "bg-red-500" : "dark: bg-slate-950"}`}
              >
                {v.iS ? (
                  <SendHorizonal size={18} strokeWidth={2} color="#ffffff" />
                ) : v.iE ? (
                  <Star size={15} fill="#ffffff" strokeOpacity={0} />
                ) : (
                  ""
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
export default LoopGame;
