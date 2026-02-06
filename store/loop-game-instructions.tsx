import { gameLoop, Loop } from "@/loops/gameLoop";
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
type InstructionsState = {
  gameBoard: Loop[][];
  userBoard: Loop[][] | null;
  instructions: Instruction[] | null;
  instructionBoard: Instruction[][] | null;
  currentInsertInstructionBox: coordinates;
  changeInstructionBox: (coordinate: coordinates) => void;
  feedInstruction: (move: MOVE, paint: COLORS, color: COLORS) => void;
};

const useInstructionStore = create<InstructionsState>()((set, get) => ({
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
}));

export default useInstructionStore;
