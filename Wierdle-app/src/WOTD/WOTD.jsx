import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {AllWordle} from '../App.jsx';

import Board from './Board.jsx';
import Keyboard from './Keyboard.jsx';
import EndGame from './EndGame.jsx';


const Header = styled.h2`
  font-size: 2em;
  margin-top:5px;
  margin-bottom: 10px;
`

const BackIcon = styled.div`
  font-size: 1em;
  cursor: pointer;
  &:hover {
    color: #56e8e6;
    font-weight: bolder;
  }
  position: absolute;
  top: 20px;
  left: 20px;

`

export default function WOTD () {

  const {setPage, endGame} = useContext(AllWordle);


  return (
    <>
      <Header>Wierd(le) of the Day
      {endGame.attemptsLeft ? <></> : <EndGame />}
      </Header>
      <Board />
      <Keyboard />
      <BackIcon onClick={() => setPage('homepage')}>{'< Go Back'}</BackIcon>
    </>
  );

};