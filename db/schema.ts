import { Instruction } from "@/store/loop-game-instructions";
import { Loop } from "@/loops/gameLoop";

/**
 * Raw data from SQLite (where arrays are stored as JSON strings)
 */
export interface DBLevel {
  id: number;
  remote_id: string;
  difficulty_level: number;
  instructions_json: string;
  game_loop_json: string;
  solved: number; // 0 or 1
}

/**
 * Hydrated level data, ready for the Zustand store
 */
export interface HydratedLevel {
  id: string;
  level: number;
  instructions: Instruction[][];
  gameLoop: Loop[][];
}

/**
 * User's progress on a specific level
 */
export interface UserProgress {
  level_remote_id: string;
  is_completed: boolean;
  best_time?: number;
  stars: number;
  last_played_at?: number;
}

/**
 * Utility: Map a DBLevel (SQLite) to a HydratedLevel (State)
 */
export const mapDBLevelToState = (row: DBLevel): HydratedLevel => ({
  id: row.remote_id,
  level: row.difficulty_level,
  instructions: JSON.parse(row.instructions_json),
  gameLoop: JSON.parse(row.game_loop_json),
});

/**
 * Utility: Prepare a level from Firebase/JSON for SQLite Insertion
 */
export const mapJsonToDBParams = (levelData: any) => ({
  remote_id: levelData.id.toString(),
  difficulty_level: levelData.level,
  instructions_json: JSON.stringify(levelData.instructions),
  game_loop_json: JSON.stringify(levelData.gameLoop),
});
