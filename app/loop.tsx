import { gameLoop } from "@/loops/gameLoop";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Circle,
  CornerUpLeft,
  CornerUpRight,
  MoveUp,
  Play,
  Plus,
  SendHorizonal,
  Star,
} from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const LoopGame = () => {
  const { width } = useWindowDimensions();
  const sz = Math.round(width / 12);
  const size = `size-[${sz - 4}]`;
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
      <View>
        <View className="flex-row flex-wrap gap-2 justify-between mx-4">
          <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
            <Plus color="#dc2626" size={35} />
          </Pressable>
          <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
            <Plus color="#fbbf24" size={35} />
          </Pressable>
          <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
            <Plus color="#4f46e5" size={35} />
          </Pressable>
          <Pressable className="size-12 mt-6 bg-red-500 rounded-lg items-center justify-center"></Pressable>
          <Pressable className="size-12 mt-6 bg-amber-500 rounded-lg items-center justify-center"></Pressable>
          <Pressable className="size-12 mt-6 bg-indigo-500 rounded-lg items-center justify-center"></Pressable>
        </View>
      </View>
      <View className="flex-row flex-wrap gap-2 justify-between mx-4">
        <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
          <MoveUp size={20} strokeWidth={4} color="#ffffff" />
        </Pressable>
        <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
          <CornerUpLeft size={20} color="#ffffff" strokeWidth={4} />
        </Pressable>
        <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
          <CornerUpRight size={20} color="#ffffff" strokeWidth={4} />
        </Pressable>
        <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
          <Circle size={20} color="#ffffff" strokeWidth={4} />
        </Pressable>
        <Pressable className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center">
          <Play size={20} color="#ffffff" strokeWidth={2} fill="#fff" />
        </Pressable>
      </View>
    </View>
  );
};
export default LoopGame;
