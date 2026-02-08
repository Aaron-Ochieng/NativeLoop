import { gameLoop, Loop } from "@/loops/gameLoop";
import { Plane } from "lucide-react-native";
import { create } from "zustand";

export type MOVE = "FORWARD" | "TURN_RIGHT" | "TURN_LEFT" | "NUll";
export type COLORS = "red" | "amber" | "indigo" | "";
export type Instruction = {
  move: MOVE;
  colorSquare: boolean;
  color: COLORS;
  paintSquare: COLORS;
  isStart: boolean;
  startCode: number | null;
};
export type coordinates = {
  row: number;
  col: number;
};
type rotate = { from: number; to: number };
type InstructionsState = {
  rotationDegree: rotate;
  startPos: coordinates;
  endPos: coordinates;
  planePos: coordinates;
  gameBoard: Loop[][];
  userBoard: Loop[][] | null;
  instructions: Instruction[] | null;
  instructionBoard: Instruction[][] | null;
  currentInsertInstructionBox: coordinates;
  changeInstructionBox: (coordinate: coordinates) => void;
  feedInstruction: (move: MOVE, paint: COLORS, color: COLORS) => void;
  play: () => void;
  currentInstructionIndex: number;
};

const useInstructionStore = create<InstructionsState>()((set, get) => ({
  currentInstructionIndex: 0,
  rotationDegree: { from: 0, to: 0 },
  startPos: { row: 9, col: 1 },
  endPos: { row: 5, col: 9 },
  planePos: { row: 9, col: 1 },
  gameBoard: gameLoop,
  userBoard: null,
  instructions: null,
  instructionBoard: [
    [
      {
        move: "NUll",
        color: "",
        colorSquare: false,
        paintSquare: "",
        isStart: true,
        startCode: 0,
      },
      {
        move: "NUll",
        color: "",
        colorSquare: false,
        paintSquare: "",
        isStart: false,
        startCode: null,
      },
      {
        move: "NUll",
        color: "",
        colorSquare: false,
        paintSquare: "",
        isStart: false,
        startCode: null,
      },
      {
        move: "NUll",
        color: "",
        colorSquare: false,
        paintSquare: "",
        isStart: false,
        startCode: null,
      },
      {
        move: "NUll",
        color: "",
        colorSquare: false,
        paintSquare: "",
        isStart: false,
        startCode: null,
      },
    ],
  ],
  currentInsertInstructionBox: { row: 0, col: 0 },
  changeInstructionBox: (coordinate) =>
    set({ currentInsertInstructionBox: coordinate }),
  feedInstruction: (move, paint, color) => {
    const { currentInsertInstructionBox, instructionBoard } = get();
    if (!instructionBoard) return;

    const { row, col } = currentInsertInstructionBox;

    const newBoard = instructionBoard.map((r) =>
      r.map((cell) => ({ ...cell })),
    );

    const cell = newBoard[row][col];

    if (cell.isStart) return;

    const next = { ...cell };
    if (color !== "") {
      // Replace color only
      next.color = color;
      next.colorSquare = true;

      newBoard[row][col] = next;
      set({ instructionBoard: newBoard });
      return;
    }

    if (paint !== "") {
      // If move exists, replace it
      if (next.move !== "NUll") {
        next.move = "NUll";
      }

      // Replace / add paint
      next.paintSquare = paint;

      newBoard[row][col] = next;
      set({ instructionBoard: newBoard });
      return;
    }

    if (move !== "NUll") {
      // If paint exists, replace it
      if (next.paintSquare !== "") {
        next.paintSquare = "";
      }

      // Replace / add move
      next.move = move;

      newBoard[row][col] = next;
      set({ instructionBoard: newBoard });
      return;
    }
  },
  play: () => {
    const {
      planePos,
      instructionBoard,
      rotationDegree,
      currentInstructionIndex,
    } = get();
    if (instructionBoard === null) return;

    const idx =
      currentInstructionIndex + 1 <= instructionBoard[0].length - 1
        ? currentInstructionIndex + 1
        : 1;
    const v = instructionBoard[0][currentInstructionIndex];
    if (v.move !== "NUll" || v.color !== "") {
      /** check if current square matches the color given */

      let c: number = 0;
      let r: number = 0;
      if (rotationDegree.to === 0) {
        c = c + 1;
      } else if (rotationDegree.to === -90) {
        r = r - 1;
      } else if (rotationDegree.to === 90) {
        r = r + 1;
      }
      const nP: coordinates = {
        row: planePos.row + r,
        col: planePos.col + c,
      };
      set({ planePos: nP });
    } else if (v.move === "TURN_LEFT") {
      const newRotationDegree: rotate = {
        from: rotationDegree.to,
        to: -90,
      };
      set({ rotationDegree: newRotationDegree });
    } else if (v.move === "TURN_RIGHT") {
      const newRotationDegree: rotate = {
        from: rotationDegree.to,
        to: -90,
      };
      set({ rotationDegree: newRotationDegree });
    }

    set({ currentInstructionIndex: idx });
  },
}));

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default useInstructionStore;
