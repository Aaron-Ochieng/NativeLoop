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
    console.log(selected);
  }
  return (
    <View className="w-full h-full bg-blue-50">
      <View className="h-1/4 "></View>
      <View className="flex flex-wrap flex-row  justify-center mt-2">
        {selected.map((val, k) =>
          val.map((_v, key) => (
            <Pressable
              key={key}
              onPress={() => toggleSelected(k, key)}
              className={`size-12 ${_v.selected ? "bg-red-500" : "bg-blue-50"} items-center justify-center border-l border-t ${(key + 1) % 9 === 0 ? "border-r" : ""} ${(k + 1) % 9 === 0 ? "border-b" : ""}`}
            >
              <Text>{_v.selected}</Text>
            </Pressable>
          )),
        )}
      </View>
    </View>
  );
}
