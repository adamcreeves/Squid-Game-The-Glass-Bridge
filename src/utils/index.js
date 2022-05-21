export const generateAnswersForBoard = (numberOfMoves) => {
  let answersArray = [];
  for (let i = 0; i < numberOfMoves; i++) {
    answersArray.push(Math.floor(Math.random() * 2));
  }
  return answersArray;
};

export const gamePiecesArray = [
  "/playerA.png",
  "/playerB.png",
  "/playerC.png",
  "/playerD.png",
  "/playerE.png",
  "/playerF.png",
  "/playerG.png",
  "/playerH.png",
  "/playerI.png",
];
