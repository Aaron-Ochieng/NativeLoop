import { Instruction } from "@/store/loop-game-instructions";
import { Circle } from "lucide-react-native";
import { Text } from "react-native";

export function InstructionIcon(instruction: Instruction) {
  if (instruction.startCode !== null) {
    if (instruction.startCode === 0) {
      return <Circle color="#fff" size={28} strokeWidth={3} />;
    }

    if (instruction.startCode === 1) {
      return <Text>1</Text>;
    }
  }
}
