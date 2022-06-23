import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {AllWordle} from '../App.jsx';

export default function EndGame () {

  let {endGame} = useContext(AllWordle);

  return (
    <>
      {endGame.correct ? <h1>You Win!</h1> : <h1>You Lose!</h1>}
    </>
  );
}