import { createCell } from "./createCell";

export function createBoard(width, height, bombs) {
  const board = [];

  for (let r = 0; r < height; r++) {
    const row = [];
    for (let c = 0; c < width; c++) {
      row.push(createCell(r, c));
    }
    board.push(row);
  }

  insertBombs(board, bombs);
  increaseNums(board);

  return board;
}

export function regenerateSafeBoard(oldBoard, safeRow, safeCol, bombs) {
  const height = oldBoard.length;
  const width = oldBoard[0].length;

  let board;
  do {
    board = createBoard(width, height, bombs);
  } while (board[safeRow][safeCol].isBomb);

  return board;
}

function increaseNums(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c].isBomb) {
        for (const [nr, nc] of getNeighbors(r, c, board)) {
          board[nr][nc].value += 1;
        }
      }
    }
  }
}

export function getNeighbors(row, col, board) {
  const neighbors = [];

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const r = row + dr;
      const c = col + dc;

      if (
        r >= 0 &&
        r < board.length &&
        c >= 0 &&
        c < board[0].length
      ) {
        neighbors.push([r, c]);
      }
    }
  }

  return neighbors;
}

function insertBombs(board, bombs) {
  let placed = 0;

  while (placed < bombs) {
    const r = Math.floor(Math.random() * board.length);
    const c = Math.floor(Math.random() * board[0].length);

    if (!board[r][c].isBomb) {
      board[r][c].isBomb = true;
      placed++;
    }
  }
}
