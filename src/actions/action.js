export function moveStep(squareNumber) {
  return {
    type: "Move",
    squareNumber
  }
}
export function jumpTo(move) {
  return {
    type: "Jump",
    move
  }
}
