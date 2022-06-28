import React, { useState, useContext, useEffect, createContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { AllWordle } from "../App.jsx";

import { defaultBoard } from "./DefaultBoard.js";

import Board from "./Board.jsx";
import Keyboard from "./Keyboard.jsx";
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

  const [speedleBank, setSpeedleBank] = useState(["WEIRD"]);
  // Timer states
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // Speedle States
  let emptyBoard = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  const [board, setBoard] = useState(defaultBoard);

  // Current Board indexes
  // const [numberCorrect, setNumberCorrect] = useState(0);
  const [currentIdx, setCurrentIdx] = useState({ row: 0, column: 0, try: 0 });

  // Notice States
  const [repeatWord, setRepeatWord] = useState(false);
  const [validWord, setValidWord] = useState(true);

  // EndGame States (might be decaprecated)
  const [endGame, setEndGame] = useState({
    attemptsLeft: true,
    correct: 0,
    incorrect: 0,
  });

  //Board BTS data
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  const handleBackspace = () => {
    if (timerOn) {
      if (endGame.attemptsLeft) {
        if (currentIdx.column > 0) {
          let tempBoard = board;
          tempBoard[currentIdx.row][currentIdx.column - 1] = "";
          setBoard(tempBoard);
          setCurrentIdx({ ...currentIdx, column: currentIdx.column - 1 });
        }
      }
    }
  };

  const handleEnter = () => {
    if (timerOn) {
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

                  if (tempArr.join("") === speedleBank[currentIdx.try]) {
                    handleNextWord();
                    // setCurrentIdx({ row: currentIdx.row + 1, column: 0 });
                    setEndGame({ ...endGame, correct: endGame.correct + 1 });
                    setValidWord(true);
                  } else {
                    setSelectedWords([
                      ...selectedWords,
                      board[currentIdx.row].join(""),
                    ]);
                    setCurrentIdx({
                      row: currentIdx.row + 1,
                      column: 0,
                      try: currentIdx.try,
                    });
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
    }
  };

  const handleLetterSelect = (letter) => {
    if (timerOn) {
      if (endGame.attemptsLeft) {
        if (currentIdx.row < 6 && currentIdx.column < 5) {
          let tempBoard = board;
          tempBoard[currentIdx.row][currentIdx.column] = letter;
          setBoard(tempBoard);
          setCurrentIdx({ ...currentIdx, column: currentIdx.column + 1 });
        }
      }
    }
  };

  const handleResetGame = () => {
    axios
      .get("/wordle/speedle/get")
      .then((data) => setSpeedleBank(data.data))
      .catch((err) => console.log(err))
      .then(() => {
        setBoard(emptyBoard);
        setEndGame({
          attemptsLeft: true,
          correct: 0,
          incorrect: 0,
        });
        setCurrentIdx({ row: 0, column: 0, try: 0 });
        setRepeatWord(false);
        setValidWord(true);
        setSelectedLetters([]);
        setSelectedWords([]);
      });
  };

  const handleNextWord = () => {
    setCurrentIdx({
      ...currentIdx,
      try: currentIdx.try + 1,
      column: 0,
      row: 0,
    });
    setBoard(emptyBoard);
    setSelectedLetters([]);
    setSelectedWords([]);
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

  useEffect(() => {
    axios
      .get("/wordle/speedle/get")
      .then((data) => setSpeedleBank(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentIdx.try < 8 && endGame.correct < 5) {
      // Game continues
    } else if (currentIdx.try <= 8 && endGame.correct === 5) {
      setEndGame({ ...endGame, attemptsLeft: false });
      setTimerOn(false);
    } else {
      setEndGame({ ...endGame, attemptsLeft: false });
      setTimerOn(false);
    }
  }, [currentIdx.try]);

  return (
    <AllSpeedle.Provider
      value={{
        time,
        setTime,
        timerOn,
        setTimerOn,
        board,
        setBoard,
        speedleBank,
        setSpeedleBank,
        currentIdx,
        setCurrentIdx,
        handleEnter,
        handleBackspace,
        handleLetterSelect,
        endGame,
        setEndGame,
        repeatWord,
        setRepeatWord,
        validWord,
        setValidWord,
        selectedLetters,
        setSelectedLetters,
        selectedWords,
        setSelectedWords,
        handleResetGame,
      }}
    >
      <Header>
        Speedle
        {/* <Notices />
        {endGame.attemptsLeft ? <></> : <EndGame />} */}
      </Header>
      <Timer />
      {timerOn ? (
        <>
          <Board />
          <Keyboard />
        </>
      ) : (
        <></>
      )}

      <BackIcon onClick={() => setPage("homepage")}>{"< Go Back"}</BackIcon>
    </AllSpeedle.Provider>
  );
}
