import React, { useState, useContext, useEffect, createContext } from "react";
import styled from "styled-components";
import { AllWordle } from "../App.jsx";
import { defaultBoard } from "./DefaultBoard.js";
import axios from "axios";
import Board from "./Board.jsx";
import Keyboard from "./Keyboard.jsx";
import EndGame from "./EndGame.jsx";
import Notices from "./Notices.jsx";

export const AllWOTD = createContext();

const Header = styled.h2`
  font-size: 2em;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const BackIcon = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  &:hover {
    color: #3a3a3c;
    font-weight: 700;
  }
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default function WOTD() {
  const { setPage, wordOTD } = useContext(AllWordle);

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
    if (currentIdx.row === 6) {
      setEndGame({ attemptsLeft: false, correct: false });
    }
  }, [currentIdx]);

  return (
    <AllWOTD.Provider
      value={{
        board,
        setBoard,
        currentIdx,
        setCurrentIdx,
        handleEnter,
        handleBackspace,
        handleLetterSelect,
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
      <Header>
        Wierd(le) of the Day
        <Notices />
        {endGame.attemptsLeft ? <></> : <EndGame />}
      </Header>
      <Board />
      <Keyboard />
      <BackIcon
        onClick={(event) => {
          event.preventDefault();
          setPage("homepage");
        }}
      >
        {"< Go Back"}
      </BackIcon>
    </AllWOTD.Provider>
  );
}
