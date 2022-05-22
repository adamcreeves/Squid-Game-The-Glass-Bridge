import { FaSkullCrossbones } from "react-icons/fa";
import Cookies from "universal-cookie";
import { db } from "../firebase";
import { s003, s014, s015, s016, s017 } from "../resources/Strings";

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

export const refreshPlayersAndWinners = (setAllWinners) => {
  const cookies = new Cookies();
  db.collection("Players")
    .get()
    .then((snapShot) => {
      let hardWinners = "";
      let mediumWinners = "";
      let easyWinners = "";
      snapShot.forEach((doc) => {
        let addZeroToNum = "";
        const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
        if (doc.data().difficultyWon.hard > 0) {
          addZeroToNum = doc.data().difficultyWon.hard < 10 ? "0" : "";
          hardWinners += [
            hasPic +
              doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.hard +
              "*",
          ];
        }
        if (doc.data().difficultyWon.medium > 0) {
          addZeroToNum = doc.data().difficultyWon.medium < 10 ? "0" : "";
          mediumWinners += [
            hasPic +
              doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.medium +
              "*",
          ];
        }
        if (doc.data().difficultyWon.easy > 0) {
          addZeroToNum = doc.data().difficultyWon.easy < 10 ? "0" : "";
          const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
          easyWinners += [
            hasPic +
              doc.data().name.charAt(0).toUpperCase() +
              doc.data().name.slice(1) +
              " --> " +
              addZeroToNum +
              doc.data().difficultyWon.easy +
              "*",
          ];
        }
      });
      const allWinners = {
        easyWinners,
        mediumWinners,
        hardWinners,
      };
      cookies.set(s003, allWinners, { path: "/" });
      setAllWinners(allWinners);
    });
};

export const playerWonForDBUpdate = (
  player,
  difficulty,
  wonTheGame,
  playingAgain,
  playerProfile
) => {
  const batch = db.batch();
  const lookupNameInDatabase = db
    .collection("Players")
    .doc(player.toLowerCase());

  if (wonTheGame) {
    lookupNameInDatabase.get().then((doc) => {
      if (doc.exists) {
        let updateDifficultyWon;
        let updateDifficultiesPlayed;
        if (difficulty === "hard") {
          updateDifficultyWon = {
            ...doc.data().difficultyWon,
            hard: doc.data().difficultyWon.hard + 1,
          };
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            hard: doc.data().difficultyPlayed.hard + 1,
          };
        } else if (difficulty === "medium") {
          updateDifficultyWon = {
            ...doc.data().difficultyWon,
            medium: doc.data().difficultyWon.medium + 1,
          };
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            medium: doc.data().difficultyPlayed.medium + 1,
          };
        } else {
          updateDifficultyWon = {
            ...doc.data().difficultyWon,
            easy: doc.data().difficultyWon.easy + 1,
          };
          updateDifficultiesPlayed = {
            ...doc.data().difficultyPlayed,
            easy: doc.data().difficultyPlayed.easy + 1,
          };
        }
        const updatedPlayerData = playingAgain
          ? {
              ...doc.data(),
              difficultyWon: updateDifficultyWon,
              difficultyPlayed: updateDifficultiesPlayed,
              gamesPlayed: doc.data().gamesPlayed + 1,
            }
          : { ...doc.data(), difficultyWon: updateDifficultyWon };

        batch.update(lookupNameInDatabase, updatedPlayerData);
        batch.commit();
      }
    });
  } else {
    const cookies = new Cookies();
    const localProfile = cookies.get(s014) || playerProfile;
    lookupNameInDatabase.get().then((doc) => {
      if (doc.exists) {
        batch.update(lookupNameInDatabase, localProfile);
        batch.commit();
      }
    });
  }
};

export const sortedWinnersList = (listOfWinners) =>
  listOfWinners
    .split("*")
    .sort(
      (a, b) =>
        parseInt(b.charAt(b.length - 2) + b.charAt(b.length - 1)) -
        parseInt(a.charAt(a.length - 2) + a.charAt(a.length - 1))
    )
    .filter((a) => a !== "")
    .map((winner) =>
      winner.charAt(winner.length - 2) === "0" &&
      winner.charAt(winner.length - 1) === "1"
        ? winner.split("0").join("") + " win"
        : winner.charAt(winner.length - 2) === "0"
        ? winner.split("0").join("") + " wins"
        : winner + " wins"
    )
    .map((winner, index) => (
      <div className="gameWinners__listRow">
        <div className="gameWinners__listItem">
          {index + 1}
          {") "}
        </div>
        <img
          className="gameWinners__playerIcon"
          src={gamePiecesArray[parseInt(winner.charAt(0), 0) || 0]}
          alt="players last game piece"
        />
        <div className="gameWinners__listItem">
          {new RegExp(`^[0-9]`).test(winner) ? winner.slice(1) : winner}
        </div>
      </div>
    ));

const buttonDisabled = () => null;

const getGamePieceSource = (index) => gamePiecesArray[index];

const renderRow = (
  correctTile,
  key,
  playerProfile,
  playersMoveCount,
  correctMovesMade,
  wrongTileSelected,
  setPlayersMoveCount,
  setCorrectMovesMade,
  setWrongTileSelected,
  extraLives,
  setExtraLives
) => {
  const correctMove = key + 1 === playersMoveCount && correctMovesMade[key];
  const wrongMove =
    key + 1 === playersMoveCount && correctMovesMade[key] === false;
  return (
    <div className="glassBridge__row">
      {correctTile === 0 ? (
        <>
          <button
            className={
              correctMove
                ? "glassBridge__tile tileCorrect"
                : "glassBridge__tile"
            }
            onClick={
              wrongTileSelected
                ? buttonDisabled()
                : key === playersMoveCount
                ? () => {
                    setPlayersMoveCount(playersMoveCount + 1);
                    setCorrectMovesMade([...correctMovesMade, true]);
                  }
                : buttonDisabled()
            }
          >
            <img
              className={
                correctMove ? "glassBridge__gamePieceImg" : "hideComponent"
              }
              src={getGamePieceSource(playerProfile.gamePiece)}
              alt="players game piece"
            />
          </button>
          <button
            className={
              wrongMove ? "glassBridge__tile tileWrong" : "glassBridge__tile"
            }
            onClick={
              wrongTileSelected
                ? buttonDisabled()
                : key === playersMoveCount
                ? () => {
                    setPlayersMoveCount(playersMoveCount + 1);
                    setWrongTileSelected(true);
                    setCorrectMovesMade([...correctMovesMade, false]);
                    const timer = setTimeout(() => {
                      setPlayersMoveCount(0);
                      setWrongTileSelected(false);
                      setCorrectMovesMade([]);
                      setExtraLives(extraLives - 1);
                    }, 1750);
                    return () => clearTimeout(timer);
                  }
                : buttonDisabled()
            }
          >
            <FaSkullCrossbones
              className={wrongMove ? "buttonIcon2" : "hideComponent"}
            />
          </button>
        </>
      ) : (
        <>
          <button
            className={
              wrongMove ? "glassBridge__tile tileWrong" : "glassBridge__tile"
            }
            onClick={
              wrongTileSelected
                ? buttonDisabled()
                : key === playersMoveCount
                ? () => {
                    setPlayersMoveCount(playersMoveCount + 1);
                    setWrongTileSelected(true);
                    setCorrectMovesMade([...correctMovesMade, false]);
                    const timer = setTimeout(() => {
                      setPlayersMoveCount(0);
                      setWrongTileSelected(false);
                      setCorrectMovesMade([]);
                      setExtraLives(extraLives - 1);
                    }, 1750);
                    return () => clearTimeout(timer);
                  }
                : buttonDisabled()
            }
          >
            <FaSkullCrossbones
              className={wrongMove ? "buttonIcon2" : "hideComponent"}
            />
          </button>
          <button
            className={
              correctMove
                ? "glassBridge__tile tileCorrect"
                : "glassBridge__tile"
            }
            onClick={
              wrongTileSelected
                ? buttonDisabled()
                : key === playersMoveCount
                ? () => {
                    setPlayersMoveCount(playersMoveCount + 1);
                    setCorrectMovesMade([...correctMovesMade, true]);
                  }
                : buttonDisabled()
            }
          >
            <img
              className={
                correctMove ? "glassBridge__gamePieceImg" : "hideComponent"
              }
              src={getGamePieceSource(playerProfile.gamePiece)}
              alt="players game piece"
            />
          </button>
        </>
      )}
    </div>
  );
};

export const resetGame = (setShowAudioPlayer, setResetApp, setPlayer) => {
  const cookies = new Cookies();
  setShowAudioPlayer(false);
  setResetApp(true);
  setPlayer("");
  cookies.remove(s015);
  cookies.remove(s017);
  cookies.remove(s016);
  cookies.remove(s014);
  const timer = setTimeout(() => {
    setResetApp(false);
    setShowAudioPlayer(true);
  }, 2000);
  return () => clearTimeout(timer);
};

export const tryAgain = (
  wonGame,
  setGameWon,
  setShowAudioPlayer,
  setPlayersMoveCount,
  setWrongTileSelected,
  setCorrectMovesMade,
  difficulty,
  setAnswers,
  setExtraLives,
  storedProfile
) => {
  const cookies = new Cookies();
  let newAnswers;
  let updateLocalProfile;
  setShowAudioPlayer(true);
  setPlayersMoveCount(0);
  setWrongTileSelected(false);
  setCorrectMovesMade([]);
  setGameWon(false);
  if (difficulty === "hard") {
    newAnswers = generateAnswersForBoard(12);
    setAnswers(newAnswers);
    setExtraLives(5);
    updateLocalProfile = wonGame
      ? {
          ...storedProfile,
          difficultyPlayed: {
            ...storedProfile.difficultyPlayed,
            hard: storedProfile.difficultyPlayed.hard + 1,
          },
          difficultyWon: {
            ...storedProfile.difficultyWon,
            hard: storedProfile.difficultyWon.hard + 1,
          },
          gamesPlayed: storedProfile.gamesPlayed + 1,
        }
      : {
          ...storedProfile,
          difficultyPlayed: {
            ...storedProfile.difficultyPlayed,
            hard: storedProfile.difficultyPlayed.hard + 1,
          },
          gamesPlayed: storedProfile.gamesPlayed + 1,
        };
  } else if (difficulty === "medium") {
    newAnswers = generateAnswersForBoard(8);
    setAnswers(newAnswers);
    setExtraLives(4);
    updateLocalProfile = wonGame
      ? {
          ...storedProfile,
          difficultyPlayed: {
            ...storedProfile.difficultyPlayed,
            medium: storedProfile.difficultyPlayed.medium + 1,
          },
          difficultyWon: {
            ...storedProfile.difficultyWon,
            medium: storedProfile.difficultyWon.medium + 1,
          },
          gamesPlayed: storedProfile.gamesPlayed + 1,
        }
      : {
          ...storedProfile,
          difficultyPlayed: {
            ...storedProfile.difficultyPlayed,
            medium: storedProfile.difficultyPlayed.medium + 1,
          },
          gamesPlayed: storedProfile.gamesPlayed + 1,
        };
  } else {
    newAnswers = generateAnswersForBoard(5);
    setAnswers(newAnswers);
    setExtraLives(3);
    updateLocalProfile = wonGame
      ? {
          ...storedProfile,
          difficultyPlayed: {
            ...storedProfile.difficultyPlayed,
            easy: storedProfile.difficultyPlayed.easy + 1,
          },
          difficultyWon: {
            ...storedProfile.difficultyWon,
            easy: storedProfile.difficultyWon.easy + 1,
          },
          gamesPlayed: storedProfile.gamesPlayed + 1,
        }
      : {
          ...storedProfile,
          difficultyPlayed: {
            ...storedProfile.difficultyPlayed,
            easy: storedProfile.difficultyPlayed.easy + 1,
          },
          gamesPlayed: storedProfile.gamesPlayed + 1,
        };
  }
  cookies.set(s014, updateLocalProfile, { path: "/" });
  cookies.set(s017, newAnswers, { path: "/" });
};

export const startGamePressed = (
  name,
  setPlayer,
  setDifficulty,
  selectedDifficulty,
  hardSelected,
  mediumSelected,
  setAnswers,
  setExtraLives,
  selectedGamePiece,
  setPlayerProfile
) => {
  const cookies = new Cookies();
  const nameAdded = name
    .trim()
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
  setPlayer(nameAdded);
  setDifficulty(selectedDifficulty);
  cookies.set(s015, nameAdded, { path: "/" });
  cookies.set(s016, selectedDifficulty, { path: "/" });
  let answers;
  if (hardSelected) {
    answers = generateAnswersForBoard(12);
    setAnswers(answers);
    setExtraLives(6);
  } else if (mediumSelected) {
    answers = generateAnswersForBoard(8);
    setAnswers(answers);
    setExtraLives(4);
  } else {
    answers = generateAnswersForBoard(5);
    setAnswers(answers);
    setExtraLives(3);
  }
  cookies.set(s017, answers, { path: "/" });

  const batch = db.batch();
  const lookupNameInDatabase = db
    .collection("Players")
    .doc(nameAdded.toLowerCase());
  lookupNameInDatabase.get().then((doc) => {
    if (doc.exists) {
      const addGame = doc.data().gamesPlayed + 1;
      let updateDifficultiesPlayed;
      if (selectedDifficulty === "hard") {
        updateDifficultiesPlayed = {
          ...doc.data().difficultyPlayed,
          hard: doc.data().difficultyPlayed.hard + 1,
        };
      } else if (selectedDifficulty === "medium") {
        updateDifficultiesPlayed = {
          ...doc.data().difficultyPlayed,
          medium: doc.data().difficultyPlayed.medium + 1,
        };
      } else {
        updateDifficultiesPlayed = {
          ...doc.data().difficultyPlayed,
          easy: doc.data().difficultyPlayed.easy + 1,
        };
      }

      const dataToSave = {
        ...doc.data(),
        gamesPlayed: addGame,
        difficultyPlayed: updateDifficultiesPlayed,
        gamePiece: selectedGamePiece,
      };
      setPlayerProfile(dataToSave);
      cookies.set(s014, dataToSave, { path: "/" });
      batch.update(lookupNameInDatabase, dataToSave);
    } else {
      let difficultyData;
      if (selectedDifficulty === "hard") {
        difficultyData = { easy: 0, medium: 0, hard: 1 };
      } else if (selectedDifficulty === "medium") {
        difficultyData = { easy: 0, medium: 1, hard: 0 };
      } else {
        difficultyData = { easy: 1, medium: 0, hard: 0 };
      }

      const dataToSave = {
        name: nameAdded.charAt(0).toUpperCase() + nameAdded.slice(1),
        gamesPlayed: 1,
        difficultyPlayed: difficultyData,
        difficultyWon: {
          easy: 0,
          medium: 0,
          hard: 0,
        },
        gamePiece: selectedGamePiece,
      };
      setPlayerProfile(dataToSave);
      cookies.set(s014, dataToSave, { path: "/" });
      batch.set(lookupNameInDatabase, dataToSave);
    }
    batch.commit();
  });
};

export const renderAllRows = (
  numberOfRows,
  answers,
  playerProfile,
  playersMoveCount,
  correctMovesMade,
  wrongTileSelected,
  setPlayersMoveCount,
  setCorrectMovesMade,
  setWrongTileSelected,
  extraLives,
  setExtraLives
) => {
  let rows = [];
  for (let i = 0; i < numberOfRows; i++) {
    rows.unshift(
      <span key={i}>
        {renderRow(
          answers[i],
          i,
          playerProfile,
          playersMoveCount,
          correctMovesMade,
          wrongTileSelected,
          setPlayersMoveCount,
          setCorrectMovesMade,
          setWrongTileSelected,
          extraLives,
          setExtraLives
        )}
      </span>
    );
  }
  return rows;
};

// To do: Optimize database logic to generate less database reads

// export const getDBShapshot = (collectionName) => {
//   const cookies = new Cookies();
//   const dbSnapshot = db
//     .collection(collectionName)
//     .get()
//     .then((snapShot) => snapShot);
//   cookies.set("dbSnapshot", dbSnapshot, { path: "/" });
//   return dbSnapshot;
// };

// export const getAllPlayers = (snapShot) => {
//   let allPlayers = [];
//   snapShot.forEach((doc) => allPlayers.push(doc));
//   return allPlayers;
// };

// export const getAllWinners = (allPlayers) => {
//   const cookies = new Cookies();
//   let hardWinners = "";
//   let mediumWinners = "";
//   let easyWinners = "";
//   allPlayers.forEach((doc) => {
//     let addZeroToNum = "";
//     const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
//     if (doc.data().difficultyWon.hard > 0) {
//       addZeroToNum = doc.data().difficultyWon.hard < 10 ? "0" : "";
//       hardWinners +=
//         hasPic +
//         doc.data().name.charAt(0).toUpperCase() +
//         doc.data().name.slice(1) +
//         " --> " +
//         addZeroToNum +
//         doc.data().difficultyWon.hard +
//         "*";
//     }
//     if (doc.data().difficultyWon.medium > 0) {
//       addZeroToNum = doc.data().difficultyWon.medium < 10 ? "0" : "";
//       mediumWinners +=
//         hasPic +
//         doc.data().name.charAt(0).toUpperCase() +
//         doc.data().name.slice(1) +
//         " --> " +
//         addZeroToNum +
//         doc.data().difficultyWon.medium +
//         "*";
//     }
//     if (doc.data().difficultyWon.easy > 0) {
//       addZeroToNum = doc.data().difficultyWon.easy < 10 ? "0" : "";
//       const hasPic = doc.data().gamePiece ? doc.data().gamePiece : "";
//       easyWinners +=
//         hasPic +
//         doc.data().name.charAt(0).toUpperCase() +
//         doc.data().name.slice(1) +
//         " --> " +
//         addZeroToNum +
//         doc.data().difficultyWon.easy +
//         "*";
//     }
//   });
//   const allWinners = {
//     easyWinners,
//     mediumWinners,
//     hardWinners,
//   };
//   cookies.set(s003, allWinners, { path: "/" });
//   return allWinners;
// };
