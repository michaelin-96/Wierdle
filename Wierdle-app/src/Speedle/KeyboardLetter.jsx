import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllSpeedle } from "./Speedle.jsx";
import "../index.css";

const KeyLetterCont = styled.div`
  width: 50px;
  height: 70px;
  margin: 5px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  font-size: 20px;
  background-color: grey;
  color: white;
  cursor: pointer;
  &:hover {
    font-weight: bolder;
    background-color: #4a4848;
  }
`;

export default function KeyboardLetter({ letter }) {
  let { handleLetterSelect, selectedLetters, speedleBank, currentIdx } =
    useContext(AllSpeedle);

  const KeyboardLetterID =
    selectedLetters.indexOf(letter) !== -1 &&
    speedleBank[currentIdx.try]?.includes(letter)
      ? "green"
      : selectedLetters.indexOf(letter) !== -1
      ? "incorrect"
      : "";

  const [keyboardLetter, setKeyboardLetter] = useState(KeyboardLetterID);

  useEffect(() => {
    const KeyboardLetterID =
      selectedLetters.indexOf(letter) !== -1 &&
      speedleBank[currentIdx.try]?.includes(letter)
        ? "green"
        : selectedLetters.indexOf(letter) !== -1
        ? "incorrect"
        : "";
    setKeyboardLetter(KeyboardLetterID);
  }, [currentIdx]);

  return (
    <>
      <KeyLetterCont
        id={keyboardLetter}
        onClick={() => {
          handleLetterSelect(letter);
        }}
      >
        {letter}
      </KeyLetterCont>
    </>
  );
}
