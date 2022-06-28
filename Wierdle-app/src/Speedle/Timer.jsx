import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { AllSpeedle } from "./Speedle.jsx";

const StartButton = styled.button`
  background-color: #fafafa;
  padding: 1em;
  font-size: 1em;
  font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  margin: 2em 1em;
  border-radius: 2px;
  width: 175px;
  cursor: pointer;
  &:hover {
    background-color: #538d4e;
    color: #fafafa;
    font-weight: bolder;
  }
  &:hover::after {
    content: "Play!";
  }
  &::after {
    content: "Start Game";
  }
`;

const StopButton = styled.button`
  background-color: #fafafa;
  padding: 1em;
  font-size: 1em;
  font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  margin: 2em 1em;
  border-radius: 2px;
  width: 175px;
  cursor: pointer;
  &:hover {
    background-color: #538d4e;
    color: #fafafa;
    font-weight: bolder;
  }
  &:hover::after {
    content: "Give Up";
  }
  &::after {
    content: "End Game";
  }
`;

const ResetButton = styled.button`
  background-color: #fafafa;
  padding: 1em;
  font-size: 1em;
  font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  margin: 2em 1em;
  border-radius: 2px;
  width: 175px;
  cursor: pointer;
  &:hover {
    background-color: #538d4e;
    color: #fafafa;
    font-weight: bolder;
  }
  &:hover::after {
    content: "Play Again!";
  }
  &::after {
    content: "Try Again?";
  }
`;

export default function Timer() {
  const { time, setTime, timerOn, setTimerOn, handleResetGame } =
    useContext(AllSpeedle);
  return (
    <div className="Timers">
      <div id="display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>

      <div id="buttons">
        {!timerOn && time === 0 && (
          <StartButton onClick={() => setTimerOn(true)}></StartButton>
        )}
        {timerOn && <StopButton onClick={() => setTimerOn(false)}></StopButton>}
        {!timerOn && time > 0 && (
          <ResetButton
            onClick={() => {
              handleResetGame();
              setTime(0);
            }}
          ></ResetButton>
        )}
      </div>
    </div>
  );
}
