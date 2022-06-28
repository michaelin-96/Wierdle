import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { defaultBoard } from "./components/DefaultBoard.js";
import { defaultBoardP } from "./components/DefaultBoardP.js";
import axios from "axios";
const Homepage = React.lazy(() => import("./Homepage/Homepage.jsx"));
const WOTD = React.lazy(() => import("./WOTD/WOTD.jsx"));
const Stats = React.lazy(() => import("./Stats/Stats.jsx"));
const Practice = React.lazy(() => import("./Practice/Practice.jsx"));
const Speedle = React.lazy(() => import("./Speedle/Speedle.jsx"));

export const AllWordle = createContext();

const AppCSS = styled.div`
  text-align: center;
  background-color: #6d8e94;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fafafa;
`;

export default function App() {
  // Universal Items
  const [page, setPage] = useState("homepage");
  const [wordOTD, setWordOTD] = useState("");
  const [randomWord, setRandomWord] = useState("");

  //WOTD states
  const [board, setBoard] = useState(defaultBoard);
  const [currentIdx, setCurrentIdx] = useState({ row: 0, column: 0 });
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [endGame, setEndGame] = useState({
    attemptsLeft: true,
    correct: false,
  });
  const [validWord, setValidWord] = useState(true);
  const [selectedWords, setSelectedWords] = useState([]);
  const [repeatWord, setRepeatWord] = useState(false);

  //Practice WOTD states
  const [boardP, setBoardP] = useState(defaultBoardP);
  const [currentIdxP, setCurrentIdxP] = useState({ row: 0, column: 0 });
  const [selectedLettersP, setSelectedLettersP] = useState([]);
  const [endGameP, setEndGameP] = useState({
    attemptsLeft: true,
    correct: false,
  });
  const [validWordP, setValidWordP] = useState(true);
  const [selectedWordsP, setSelectedWordsP] = useState([]);
  const [repeatWordP, setRepeatWordP] = useState(false);

  const renderView = () => {
    switch (page) {
      case "homepage":
        return <Homepage />;
      case "wotd":
        return <WOTD />;
      case "stats":
        return <Stats />;
      case "practice":
        return <Practice />;
      case "speed":
        return <Speedle />;
      default:
        return <Homepage />;
    }
  };

  const handleBackspace = () => {
    if (page === "wotd") {
      if (endGame.attemptsLeft) {
        if (currentIdx.column > 0) {
          let tempBoard = board;
          tempBoard[currentIdx.row][currentIdx.column - 1] = "";
          setBoard(tempBoard);
          setCurrentIdx({ ...currentIdx, column: currentIdx.column - 1 });
        }
      }
    } else {
      if (endGameP.attemptsLeft) {
        if (currentIdxP.column > 0) {
          let tempBoard = boardP;
          tempBoard[currentIdxP.row][currentIdxP.column - 1] = "";
          setBoardP(tempBoard);
          setCurrentIdxP({ ...currentIdxP, column: currentIdxP.column - 1 });
        }
      }
    }
  };

  const handleEnter = () => {
    if (page === "wotd") {
      if (endGame.attemptsLeft) {
        if (currentIdx.column === 5) {
          if (selectedWords.indexOf(board[currentIdx.row].join("")) === -1) {
            setRepeatWord(false);
            let word = board[currentIdx.row].join("");
            axios
              .get(`/wordle/wotd/check?word=${word}`)
              .then((data) => {
                if (data.data.rowCount) {
                  let tempArr = [
                    board[currentIdx.row][0],
                    board[currentIdx.row][1],
                    board[currentIdx.row][2],
                    board[currentIdx.row][3],
                    board[currentIdx.row][4],
                  ];
                  setSelectedLetters([...selectedLetters, ...tempArr]);
                  if (tempArr.join("") === wordOTD) {
                    setCurrentIdx({ row: currentIdx.row + 1, column: 0 });
                    setEndGame({ attemptsLeft: false, correct: true });
                    setValidWord(true);
                  } else {
                    setSelectedWords([
                      ...selectedWords,
                      board[currentIdx.row].join(""),
                    ]);
                    setCurrentIdx({ row: currentIdx.row + 1, column: 0 });
                    setValidWord(true);
                  }
                } else {
                  setValidWord(false);
                }
              })
              .catch((err) => console.log(err));
          } else {
            setRepeatWord(true);
          }
        }
      }
    } else {
      if (endGameP.attemptsLeft) {
        if (currentIdxP.column === 5) {
          if (selectedWordsP.indexOf(boardP[currentIdxP.row].join("")) === -1) {
            setRepeatWordP(false);
            let word = boardP[currentIdxP.row].join("");
            axios
              .get(`/wordle/wotd/check?word=${word}`)
              .then((data) => {
                if (data.data.rowCount) {
                  let tempArr = [
                    boardP[currentIdxP.row][0],
                    boardP[currentIdxP.row][1],
                    boardP[currentIdxP.row][2],
                    boardP[currentIdxP.row][3],
                    boardP[currentIdxP.row][4],
                  ];
                  setSelectedLettersP([...selectedLettersP, ...tempArr]);
                  if (tempArr.join("") === randomWord) {
                    setCurrentIdxP({ row: currentIdxP.row + 1, column: 0 });
                    setEndGameP({ attemptsLeft: false, correct: true });
                    setValidWordP(true);
                  } else {
                    setSelectedWordsP([
                      ...selectedWordsP,
                      boardP[currentIdxP.row].join(""),
                    ]);
                    setCurrentIdxP({ row: currentIdxP.row + 1, column: 0 });
                    setValidWordP(true);
                  }
                } else {
                  setValidWordP(false);
                }
              })
              .catch((err) => console.log(err));
          } else {
            setRepeatWordP(true);
          }
        }
      }
    }
  };

  const handleLetterSelect = (letter) => {
    if (page === "wotd") {
      if (endGame.attemptsLeft) {
        if (currentIdx.row < 6 && currentIdx.column < 5) {
          let tempBoard = board;
          tempBoard[currentIdx.row][currentIdx.column] = letter;
          setBoard(tempBoard);
          setCurrentIdx({ ...currentIdx, column: currentIdx.column + 1 });
        }
      }
    } else {
      if (endGameP.attemptsLeft) {
        if (currentIdxP.row < 6 && currentIdxP.column < 5) {
          let tempBoard = boardP;
          tempBoard[currentIdxP.row][currentIdxP.column] = letter;
          setBoardP(tempBoard);
          setCurrentIdxP({ ...currentIdxP, column: currentIdxP.column + 1 });
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get("/wordle/wotd/get")
      .then((data) => setWordOTD(data.data))
      .catch((err) => console.log(err))
      .then(() => {
        axios
          .get("/wordle/practice/get")
          .then((data) => setRandomWord(data.data))
          .catch((err) => console.log(err));
      });
  }, []);

  useEffect(() => {
    if (page === "wotd") {
      if (currentIdx.row === 6) {
        setEndGame({ attemptsLeft: false, correct: false });
      }
    } else {
      if (currentIdxP.row === 6) {
        setEndGameP({ attemptsLeft: false, correct: false });
      }
    }
  }, [currentIdx, currentIdxP]);

  return (
    <AppCSS>
      <AllWordle.Provider
        value={{
          page,
          setPage,
          board,
          setBoard,
          currentIdx,
          setCurrentIdx,
          handleEnter,
          handleBackspace,
          handleLetterSelect,
          wordOTD,
          selectedLetters,
          setSelectedLetters,
          endGame,
          setEndGame,
          validWord,
          setValidWord,
          repeatWord,
          setRepeatWord,
          boardP,
          setBoardP,
          currentIdxP,
          setCurrentIdxP,
          selectedLettersP,
          setSelectedLettersP,
          endGameP,
          setEndGameP,
          validWordP,
          setValidWordP,
          selectedWordsP,
          setSelectedWordsP,
          repeatWordP,
          setRepeatWordP,
          randomWord,
          setRandomWord,
        }}
      >
        <React.Suspense fallback={<p>loading...</p>}>
          {renderView()}
        </React.Suspense>
      </AllWordle.Provider>
    </AppCSS>
  );
}
