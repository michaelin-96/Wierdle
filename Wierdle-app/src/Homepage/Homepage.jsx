import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import HowToModal from './HowToModal.jsx';
import {AllWordle} from '../App.jsx';


const HomepageButtons = styled.button`
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
    background-color: #38f547;

  }
  &:hover::after {
    content: 'Play!';
  }
`


export default function Homepage () {

  const [howToOpen, setHowToOpen] = useState(false);

  const {page, setPage} = useContext(AllWordle);


  return (
    <>
      <h1>Weirdle</h1>
      <h2>by Michael Lin</h2>
      <HomepageButtons onClick={() => setHowToOpen(true)}>How to Play</HomepageButtons>
      <HomepageButtons onClick={() => setPage('wotd')}>Word of the Day (Original)</HomepageButtons>
      <HomepageButtons onClick={() => setPage('stats')}>Statistics</HomepageButtons>
      <HowToModal open={howToOpen} onClose={() => setHowToOpen(false)}/>
    </>
  );

}