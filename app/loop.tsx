import { InstructionIcon } from "@/components/start-instruction-icon";
import WhereToRotate from "@/components/where-to-rotate";
import useInstructionStore from "@/store/loop-game-instructions";
import {
  ChevronRight,
  
  CornerUpLeft,
  CornerUpRight,
  MoveUp,
  Play,
  Plus,
  SendHorizonal,
  Star,
} from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const LoopGame = () => {
  const {
    instructionBoard,
    changeInstructionBox,
    currentInsertInstructionBox,
    feedInstruction,
    startPos,
    play,
    planePos,
    rotationDegree,
    gameBoard,
  } = useInstructionStore();

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

  return (
    <View className="bg-slate-900 items-center justify-center w-full h-full">
      <Text className="text-white font-bold text-2xl">
        {rotationDegree.to}
        {"  "} {WhereToRotate(rotationDegree.to)}
      </Text>
      <View className="">
        {gameBoard.map((v, k) => (
          <View key={k} className="flex-row">
            {v.map((v, key) => (
              <View
                key={key}
                className={`size-[30] m-[1px] rounded-lg items-center justify-center  ${v.c === "indigo" ? "bg-indigo-600" : v.c === "red" ? "bg-red-500" : v.c === "amber" ? "bg-amber-500" : "bg-slate-950"}`}
              >
                {(v.iS || v.iE) &&
                k !== startPos.row &&
                key !== startPos.col ? (
                  <Star
                    size={15}
                    fill="#ffffff"
                    strokeOpacity={0}
                    color="#ffffff"
                  />
                ) : k === planePos.row && key === planePos.col ? (
                  <View className={`${WhereToRotate(rotationDegree.to)}`}>
                    <SendHorizonal color="#ffffff" fill="#ffffff" size={20} />
                  </View>
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
          <Pressable
            onPress={() => {
              feedInstruction("NUll", "red", "");
            }}
            className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
          >
            <Plus color="#dc2626" size={35} />
          </Pressable>
          <Pressable
            onPress={() => {
              feedInstruction("NUll", "amber", "");
            }}
            className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
          >
            <Plus color="#fbbf24" size={35} />
          </Pressable>
          <Pressable
            onPress={() => {
              feedInstruction("NUll", "indigo", "");
            }}
            className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
          >
            <Plus color="#4f46e5" size={35} />
          </Pressable>
          <Pressable
            onPress={() => {
              feedInstruction("NUll", "", "red");
            }}
            className="size-12 mt-6 bg-red-500 rounded-lg items-center justify-center"
          ></Pressable>
          <Pressable
            onPress={() => {
              feedInstruction("NUll", "", "amber");
            }}
            className="size-12 mt-6 bg-amber-500 rounded-lg items-center justify-center"
          ></Pressable>
          <Pressable
            onPress={() => {
              feedInstruction("NUll", "", "indigo");
            }}
            className="size-12 mt-6 bg-indigo-500 rounded-lg items-center justify-center"
          ></Pressable>
        </View>
      </View>
      <View className="flex-row flex-wrap gap-2 justify-between mx-4">
        <Pressable
          onPress={() => {
            feedInstruction("FORWARD", "", "");
          }}
          className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
        >
          <MoveUp size={20} strokeWidth={4} color="#ffffff" />
        </Pressable>
        <Pressable
          onPress={() => {
            feedInstruction("TURN_LEFT", "", "");
          }}
          className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
        >
          <CornerUpLeft size={20} color="#ffffff" strokeWidth={4} />
        </Pressable>
        <Pressable
          onPress={() => {
            feedInstruction("TURN_RIGHT", "", "");
          }}
          className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
        >
          <CornerUpRight size={20} color="#ffffff" strokeWidth={4} />
        </Pressable>
        <Pressable
          onPress={() => {
            feedInstruction("REPEAT", "", "");
          }}
          className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
        >
          <Text className="text-white font-bold text-xl">0</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            play();
          }}
          className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
        >
          <Play size={20} color="#ffffff" strokeWidth={2} fill="#fff" />
        </Pressable>
        <Pressable
          onPress={() => {
            play();
          }}
          className="size-12 mt-6 bg-slate-950 rounded-lg items-center justify-center"
        >
          <ChevronRight size={20} color="#ffffff" strokeWidth={3} />
        </Pressable>
      </View>
      <View className="mt-4">
        {instructionBoard?.map((_i, k) => (
          <View key={k} className="flex-row gap-2">
            {_i!.map((v, key) => (
              <Pressable
                key={key}
                onPress={
                  key === 0
                    ? undefined
                    : () => {
                        changeInstructionBox({ row: k, col: key });
                      }
                }
              >
                <View
                  className={`size-12 ${instructionBoard[k][key].color === "amber" ? "bg-amber-500" : instructionBoard[k][key].color === "indigo" ? "bg-indigo-500" : instructionBoard[k][key].color === "red" ? "bg-red-500" : "bg-slate-950"} rounded-xl items-center justify-center ${currentInsertInstructionBox.row === k && currentInsertInstructionBox.col === key && instructionBoard[k][key].color === "" ? "border-2 border-slate-500" : ""}`}
                >
                  {InstructionIcon(v)}
                  {instructionBoard[k][key].paintSquare ? (
                    <Plus
                      color={
                        instructionBoard[k][key].paintSquare === "amber"
                          ? "#f59e0b"
                          : instructionBoard[k][key].paintSquare === "red"
                            ? "#ef4444"
                            : instructionBoard[k][key].paintSquare === "indigo"
                              ? "#4f46e5"
                              : "white"
                      }
                      strokeWidth={3}
                    />
                  ) : instructionBoard[k][key].move === "FORWARD" ? (
                    <MoveUp size={20} strokeWidth={4} color="#ffffff" />
                  ) : instructionBoard[k][key].move === "TURN_LEFT" ? (
                    <CornerUpLeft size={20} color="#ffffff" strokeWidth={4} />
                  ) : instructionBoard[k][key].move === "TURN_RIGHT" ? (
                    <CornerUpRight size={20} color="#ffffff" strokeWidth={4} />
                  ) : instructionBoard[k][key].move === "REPEAT" ? (
                    <Text className="text-white font-bold text-xl">0</Text>
                  ) : (
                    ""
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};
export default LoopGame;
