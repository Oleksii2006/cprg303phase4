export function createCell(row, col) {
  return {
    row,
    col,
    isBomb: false,
    isFlipped: false,
    isRevealed: false,
    value: 0,
  };
}
