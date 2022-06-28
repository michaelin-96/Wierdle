import React, { useState, useContext, useEffect, createContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AllWordle } from "../App.jsx";

import Board from "../components/Board.jsx";
import Keyboard from "../components/Keyboard.jsx";
import EndGame from "../components/EndGame.jsx";
import Notices from "../components/Notices.jsx";

import Timer from "./Timer.jsx";

export const AllSpeedle = createContext();

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

export default function Speedle() {
  const { setPage } = useContext(AllWordle);

  const [speedleBank, setSpeedleBank] = useState([]);
  // Timer states
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // Speedle States
  const [board, setBoard] = useState();

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
                if (tempArr.join("") === speedleBank) {
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
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <AllSpeedle.Provider value={{ time, setTime, timerOn, setTimerOn }}>
      <Header>
        Speedle
        {/* <Notices />
        {endGame.attemptsLeft ? <></> : <EndGame />} */}
      </Header>
      <Timer />
      {/* <Board />
      <Keyboard /> */}
      <BackIcon onClick={() => setPage("homepage")}>{"< Go Back"}</BackIcon>
    </AllSpeedle.Provider>
  );
}
