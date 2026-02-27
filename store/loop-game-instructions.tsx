import { gameLoop, Loop } from "@/loops/gameLoop";
import { create } from "zustand";
import { rotationDegree as rt } from "@/utils/rotation";

export type MOVE = "FORWARD" | "TURN_RIGHT" | "TURN_LEFT" | "REPEAT" | "NUll";
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
  won: boolean;
  canPlay: boolean;
  rotationDegree: rotate;
  startPos: coordinates;
  endPos: coordinates;
  planePos: coordinates;
  gameBoard: Loop[][];
  _gameBoardCopy: Loop[][] | null;
  userBoard: Loop[][] | null;
  instructions: Instruction[] | null;
  instructionBoard: Instruction[][] | null;
  currentInsertInstructionBox: coordinates;
  changeInstructionBox: (coordinate: coordinates) => void;
  feedInstruction: (move: MOVE, paint: COLORS, color: COLORS) => void;
  _moveForward: () => void;
  _changeGridColor: (c: COLORS) => void;
  _copyGameBoard: () => void;
  play: () => void;
  currentInstructionIndex: number;
  resetGame: () => void;
  _planeOverlaps: () => void;
};

const useInstructionStore = create<InstructionsState>()((set, get) => ({
  won: false,
  canPlay: true,
  currentInstructionIndex: 0,
  rotationDegree: { from: 0, to: 0 },
  startPos: { row: 9, col: 1 },
  endPos: { row: 5, col: 9 },
  planePos: { row: 9, col: 1 },
  gameBoard: gameLoop,
  _gameBoardCopy: null,
  _copyGameBoard: () => {
    set({ _gameBoardCopy: gameLoop });
  },
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
  _planeOverlaps: () => {
    const { planePos, startPos, gameBoard } = get();
    if (
      gameBoard[planePos.row][planePos.col].c === "" &&
      gameLoop[planePos.row][planePos.col].c === ""
    ) {
      setTimeout(() => {
        set({ planePos: startPos, currentInstructionIndex: 0 });
      }, 500);
    }
  },
  _moveForward: () => {
    const { planePos, rotationDegree, _planeOverlaps } = get();
    if (rotationDegree.to === 0) {
      set({ planePos: { row: planePos.row, col: planePos.col + 1 } });
      _planeOverlaps();
    } else if (rotationDegree.to === 180 || rotationDegree.to === -180) {
      set({ planePos: { row: planePos.row, col: planePos.col - 1 } });
      _planeOverlaps();
    } else if (rotationDegree.to === 90 || rotationDegree.to === -270) {
      set({ planePos: { row: planePos.row + 1, col: planePos.col } });
      _planeOverlaps();
    } else if (rotationDegree.to === -90 || rotationDegree.to === 270) {
      set({ planePos: { row: planePos.row - 1, col: planePos.col } });
      _planeOverlaps();
    }
  },

  _changeGridColor: (color: COLORS) => {
    const { gameBoard, planePos } = get();
    if (color !== "") {
      const newBoard = gameBoard.map((row, r) =>
        row.map((cell, c) =>
          r === planePos.row && c === planePos.col
            ? { ...cell, c: color }
            : cell,
        ),
      );
      set({ gameBoard: newBoard });
    }
  },
  play: () => {
    const {
      planePos,
      instructionBoard,
      rotationDegree,
      currentInstructionIndex,
      _changeGridColor,
      _moveForward,
      gameBoard,
      endPos,
      resetGame,
    } = get();
    if (instructionBoard === null) return;

    if (planePos.row === endPos.row && planePos.col === endPos.col) {
      set({ won: true });
      resetGame();
      return;
    }
    let idx = currentInstructionIndex + 1;
    if (idx >= instructionBoard[0].length) {
      idx = backTrack(idx, instructionBoard);
    }
    const v = instructionBoard[0][currentInstructionIndex];

    if (v.move === "FORWARD" && v.color !== "") {
      /** check if current square matches the color given */
      /** Move the plane if it matches the box color */
      /** Check the plane rotation degree */
      if (gameBoard[planePos.row][planePos.col].c === v.color) {
        _moveForward();
      }
    } else if (v.move === "FORWARD" && v.color === "") {
      _moveForward();
    } else if (v.move === "TURN_LEFT" && v.color !== "") {
      if (gameBoard[planePos.row][planePos.col].c === v.color) {
        const { to } = rotationDegree;
        const degree = rt(to, -90);
        set({ rotationDegree: { from: to, to: degree } });
      }
    } else if (v.move === "TURN_LEFT") {
      const { to } = rotationDegree;
      const degree = rt(to, -90);
      set({ rotationDegree: { from: to, to: degree } });
    } else if (v.move === "TURN_RIGHT" && v.color !== "") {
      if (gameBoard[planePos.row][planePos.col].c === v.color) {
        const { to } = rotationDegree;
        const degree = rt(to, 90);
        set({ rotationDegree: { from: to, to: degree } });
      }
    } else if (v.move === "TURN_RIGHT") {
      const { to } = rotationDegree;
      const degree = rt(to, 90);
      set({ rotationDegree: { from: to, to: degree } });
    } else if (v.paintSquare !== "" && v.color !== "") {
      if (gameBoard[planePos.row][planePos.col].c !== v.paintSquare) {
        _changeGridColor(v.paintSquare);
      }
    } else if (v.paintSquare !== "") {
      _changeGridColor(v.paintSquare);
    } else if (v.move === "REPEAT" && v.color !== "") {
      if (gameBoard[planePos.row][planePos.col].c === v.color) {
        // check if there is a repeat loop in the front the set start Index to that;
        idx = backTrack(idx, instructionBoard);
      }
    } else if (v.move === "REPEAT") {
      idx = backTrack(idx, instructionBoard);
    }

    set({ currentInstructionIndex: idx });
  },
  resetGame: () => {
    const { startPos } = get();
    set({
      planePos: startPos,
      rotationDegree: { from: 0, to: 0 },
      won: false,
    });
  },
}));

const backTrack = (
  currentIndex: number,
  instructionBoard: Instruction[][],
): number => {
  if (currentIndex >= instructionBoard[0].length) {
    for (let i = instructionBoard[0].length - 1; i >= 1; i--) {
      if (instructionBoard[0][i].move === "REPEAT") {
        const nextIndex = i + 1;
        return nextIndex < instructionBoard[0].length ? nextIndex : 1;
      }
    }
  }
  return 1;
};
export default useInstructionStore;
