import { getNeighbors, createBoard } from "../utils/createBoard";

export function gameReducer(state, action) {
  const { type, row, col, width, height, bombs } = action;

  switch (type) {
    case "HANDLE_CELL": {
      const cell = state.board[row][col];

      if (cell.isBomb) {
        return {
          ...state,
          board: flipAll(state.board),
          isGameOver: true,
          isWin: false,
        };
      }

      const newBoard =
        cell.value === 0
          ? expand(row, col, state.board)
          : flipCell(row, col, state.board);

      return {
        ...state,
        board: newBoard,
        isWin: checkWin(newBoard),
      };
    }

    case "REVEAL_BOMBS":
      return {
        ...state,
        board: revealBombs(state.board),
      };

    case "RESET_GAME":
      return {
        board: createBoard(width, height, bombs),
        isGameOver: false,
        isWin: false,
      };

    default:
      return state;
  }
}

function checkWin(board) {
  for (const row of board) {
    for (const cell of row) {
      if (!cell.isBomb && !cell.isFlipped) {
        return false;
      }
    }
  }
  return true;
}

function cloneBoard(board) {
  return board.map(row => row.map(cell => ({ ...cell })));
}

function flipCell(row, col, board) {
  const copy = cloneBoard(board);
  copy[row][col].isFlipped = true;
  return copy;
}

function expand(row, col, board) {
  const copy = cloneBoard(board);
  const stack = [[row, col]];

  while (stack.length) {
    const [r, c] = stack.pop();

    if (copy[r][c].isFlipped) continue;

    copy[r][c].isFlipped = true;

    if (copy[r][c].value === 0) {
      for (const [nr, nc] of getNeighbors(r, c, copy)) {
        if (!copy[nr][nc].isBomb && !copy[nr][nc].isFlipped) {
          stack.push([nr, nc]);
        }
      }
    }
  }

  return copy;
}

function flipAll(board) {
  return board.map(row =>
    row.map(cell => ({ ...cell, isFlipped: true }))
  );
}

function revealBombs(board) {
  return board.map(row =>
    row.map(cell =>
      cell.isBomb ? { ...cell, isRevealed: true } : cell
    )
  );
}
