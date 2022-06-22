import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import HowToModal from './HowToModal.jsx';

const HomepageCSS = styled.div`
  text-align: center;
  background-color: #5a6375;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fafafa;
`

const HomepageButtons = styled.button`
  background-color: #fafafa;
  padding: 1em;
  font-size: 1em;
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  margin-top: 2em;
  border-radius: 2px;
  min-width: 175px;
  &:hover {
    background-color: #38f547;
  }
`


export default function Homepage () {

  const [howToOpen, setHowToOpen] = useState(false);

  return (
    <>
    <HomepageCSS>
      <h1>Weirdle</h1>
      <h2>by Michael Lin</h2>
      <HomepageButtons onClick={() => setHowToOpen(true)}>How to Play</HomepageButtons>
      <HomepageButtons>Word of The Day</HomepageButtons>
      <HomepageButtons>Statistics</HomepageButtons>
      <HowToModal open={howToOpen} onClose={() => setHowToOpen(false)}/>
    </HomepageCSS>
    </>
  );

}