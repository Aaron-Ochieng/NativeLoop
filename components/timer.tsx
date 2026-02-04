import { Text } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import secondsToTimeString from "@/utils/seconds-to-time-string";

const Timer = () => {
  return (
    <CountdownCircleTimer
      strokeWidth={2}
      size={100}
      isPlaying
      duration={300}
      colors={["#3B82F6", "#F7B801", "#A50000", "#A30000"]}
      colorsTime={[225, 125, 100, 75]}
    >
      {({ remainingTime }) => (
        <Text className="text-white">{secondsToTimeString(remainingTime)}</Text>
      )}
    </CountdownCircleTimer>
  );
};
export default Timer;
