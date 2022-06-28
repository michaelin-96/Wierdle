import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { defaultBoard } from "./WOTD/DefaultBoard.js";
import axios from "axios";
const Homepage = React.lazy(() => import("./Homepage/Homepage.jsx"));
const WOTD = React.lazy(() => import("./WOTD/WOTD.jsx"));
const Stats = React.lazy(() => import("./Stats/Stats.jsx"));
const Practice = React.lazy(() => import("./Practice/Practice.jsx"));

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
  const [page, setPage] = useState("homepage");
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

  const [wordOTD, setWordOTD] = useState("");
  const [randomWord, setRandomWord] = useState("");

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
      default:
        return <Homepage />;
    }
  };

  const handleBackspace = () => {
    if (endGame.attemptsLeft) {
      if (currentIdx.column > 0) {
        let tempBoard = board;
        tempBoard[currentIdx.row][currentIdx.column - 1] = "";
        setBoard(tempBoard);
        setCurrentIdx({ ...currentIdx, column: currentIdx.column - 1 });
      }
    }
  };

  const handleEnter = () => {
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
  };

  const handleLetterSelect = (letter) => {
    if (endGame.attemptsLeft) {
      if (currentIdx.row < 6 && currentIdx.column < 5) {
        let tempBoard = board;
        tempBoard[currentIdx.row][currentIdx.column] = letter;
        setBoard(tempBoard);
        setCurrentIdx({ ...currentIdx, column: currentIdx.column + 1 });
      }
    }
  };

  useEffect(() => {
    axios
      .get("/wordle/wotd/get")
      .then((data) => setWordOTD(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentIdx.row === 6) {
      setEndGame({ attemptsLeft: false, correct: false });
    }
  }, [currentIdx]);

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
        }}
      >
        <React.Suspense fallback={<p>loading...</p>}>
          {renderView()}
        </React.Suspense>
      </AllWordle.Provider>
    </AppCSS>
  );
}
