import Timer from "@/components/timer";
import { initial, Memory } from "@/loops/initial";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const [selected, setSelected] = useState<Memory[][]>(initial);
  function toggleSelected(rowIndex: number, colIndex: number) {
    setSelected((prevSelected) => {
      const newMemory = prevSelected.map((row, rIdx) => {
        if (rIdx !== rowIndex) return row;
        return row.map((cell, cIdx) => {
          if (cIdx !== colIndex) return cell;
          return { ...cell, selected: !cell.selected };
        });
      });
      return newMemory;
    });
  }

  function startRound() {
    const newPattern = generatePattern(
      ROWS,
      COLS,
      ACTIVE_CELLS + Math.floor(score / 5),
    ); // Increase difficulty every 5 points
    setTargetGrid(newPattern);
    // Initialize empty user grid
    setUserGrid(
      Array(ROWS)
        .fill(null)
        .map(() =>
          Array(COLS)
            .fill(null)
            .map(() => ({ selected: false })),
        ),
    );
    setPhase("MEMORIZE");
  }

  // Memorization Timer
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "MEMORIZE") {
      timeout = setTimeout(() => {
        setPhase("RECALL");
      }, 3000); // 3 seconds to memorize
    }
    return () => clearTimeout(timeout);
  }, [phase]);

  function handleCellPress(rowIndex: number, colIndex: number) {
    if (phase !== "RECALL") return;

    const isTarget = targetGrid[rowIndex][colIndex].selected;
    const isAlreadySelected = userGrid[rowIndex][colIndex].selected;

    if (isAlreadySelected) return;

    if (isTarget) {
      const newUserGrid = [...userGrid];
      newUserGrid[rowIndex][colIndex] = { selected: true }; // Mark as found
      setUserGrid(newUserGrid);

      // Check for round completion
      let correctCount = 0;
      let totalTargets = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (targetGrid[r][c].selected) totalTargets++;
          if (targetGrid[r][c].selected && newUserGrid[r][c].selected)
            correctCount++;
        }
      }

      if (correctCount === totalTargets) {
        setScore((s) => s + 1);
        setTimeout(startRound, 500);
      }
    } else {
      // Briefly show red then reset
      const newUserGrid = [...userGrid];
      newUserGrid[rowIndex][colIndex] = { selected: true }; // Mark as selected (wrong)
      setUserGrid(newUserGrid);
      setTimeout(startRound, 500); // Brief delay to realize mistake
    }
  }

  

  return (
    <View className="w-full h-full bg-blue-50 dark:bg-slate-900">
      <View className="h-1/4 w-full items-center justify-center">
        <Timer />
      </View>
      <View className="flex flex-wrap flex-row  justify-center mt-2">
        {selected.map((val, k) =>
          val.map((_v, key) => (
            <Pressable
              key={key}
              onPress={() => toggleSelected(k, key)}
              className={`size-12 border-blue-700 ${_v.selected ? "bg-blue-500 dark:bg-blue-400" : "bg-blue-50 dark:bg-slate-900"} items-center justify-center  border-l-[0.5px] border-t-[0.5px] ${(key + 1) % 9 === 0 ? "border-r-[0.5px]" : ""} ${(k + 1) % 9 === 0 ? "border-b-[0.5px]" : ""} dark:border-gray-50/30`}
            >
              <Text>{_v.selected}</Text>
            </Pressable>
          )),
        )}
      </View>
    </View>
  );
}
