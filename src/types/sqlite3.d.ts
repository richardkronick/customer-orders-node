import 'sqlite3';

declare module 'sqlite3' {
  interface RunResult {
    lastID: number;
  }
}