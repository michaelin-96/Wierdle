import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import HowToModal from './HowToModal.jsx';
import {AllWordle} from '../App.jsx';


const HowToButton = styled.button`
  background-color: #fafafa;
  padding: 1em;
  font-size: 1em;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  margin-top: 2em;
  border-radius: 2px;
  width: 175px;
  cursor: pointer;
  &:hover {
    background-color: #538d4e;
    color: #fafafa;
    font-weight: bolder;
  }
  &:hover::after {
    content: 'See How to Play';
  }
  &::after {
    content: 'How to Play';
  }
`

const WOTDButton = styled.button`
  background-color: #fafafa;
  padding: 0.5em;
  font-size: 1em;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  margin-top: 2em;
  border-radius: 2px;
  width: 175px;
  height: 75px;
  cursor: pointer;
  &:hover {
    background-color: #538d4e;
    color: #fafafa;
    font-weight: bolder;
  }
  &:hover::after {
    content: 'Play!';
  }
  &::after {
    content: 'Wierd(le) of the Day (Normal)';
  }
`
const StatButton = styled.button`
  background-color: #fafafa;
  padding: 1em;
  font-size: 1em;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  margin-top: 2em;
  border-radius: 2px;
  width: 175px;
  cursor: pointer;
  &:hover {
    background-color: #538d4e;
    color: #fafafa;
    font-weight: bolder;
  }
  &:hover::after {
    content: 'View Stats';
  }
  &::after {
    content: 'Statistics';
  }
`


export default function Homepage () {

  const [howToOpen, setHowToOpen] = useState(false);

  const {setPage} = useContext(AllWordle);


  return (
    <>
      <h1>Weirdle</h1>
      <h2>by Michael Lin</h2>
      <HowToButton onClick={() => setHowToOpen(true)}></HowToButton>
      <WOTDButton onClick={() => setPage('wotd')}></WOTDButton>
      <StatButton onClick={() => setPage('stats')}></StatButton>
      <HowToModal open={howToOpen} onClose={() => setHowToOpen(false)}/>
    </>
  );

}