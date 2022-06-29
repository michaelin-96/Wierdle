import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllSpeedle } from "./Speedle.jsx";

const NoticeBody = styled.h5`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #f07171;
  background-color: #fafafa;
  border-radius: 5px;
`;

const StatusBody = styled.h5`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #6d8e94;
  background-color: #fafafa;
  border-radius: 5px;
`;

export default function Notices() {
  const { validWord, repeatWord, endGame } = useContext(AllSpeedle);

  return (
    <>
      <br></br>
      {validWord ? <></> : <NoticeBody>Not A Valid Word</NoticeBody>}
      {repeatWord ? <NoticeBody>Word Already Used</NoticeBody> : <></>}
      {endGame.correct !== 0 || endGame.incorrect !== 0 ? (
        <StatusBody>
          {endGame.correct} Correct! & {endGame.incorrect} Incorrect! <br></br>
          {8 - endGame.correct - endGame.incorrect} tries left.{" "}
          {5 - endGame.correct} to win
        </StatusBody>
      ) : (
        <></>
      )}
    </>
  );
}
