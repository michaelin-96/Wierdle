import React, {useState, useEffect, createContext} from 'react';
import styled from 'styled-components';
import {defaultBoard} from './WOTD/DefaultBoard.js';
const Homepage = React.lazy(() => import('./Homepage/Homepage.jsx'));
const WOTD = React.lazy(() => import('./WOTD/WOTD.jsx'));
const Stats = React.lazy(() => import('./Stats/Stats.jsx'));

export const AllWordle = createContext();

const AppCSS = styled.div`
  text-align: center;
  background-color: #6d8e94;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fafafa;
`

export default function App () {

  const [page, setPage] = useState('homepage');
  const [board, setBoard] = useState(defaultBoard);
  const [currentIdx, setCurrentIdx] = useState({ row: 0, column: 0});
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [endGame, setEndGame] = useState({attemptsLeft: true, correct: false});

  // dummy WOTD for now
  const wordOTD = 'WEIRD';

  const renderView = () => {
    switch (page) {
      case "homepage":
        return <Homepage />;
      case "wotd":
        return <WOTD />;
      case "stats":
        return <Stats />;
      default:
        return <Homepage />;
    }
  }

  const handleBackspace = () => {
    if (endGame.attemptsLeft) {
      if (currentIdx.column > 0) {
        let tempBoard = board;
        tempBoard[currentIdx.row][currentIdx.column - 1] = '';
        setBoard(tempBoard);
        setCurrentIdx({...currentIdx, column: currentIdx.column - 1})
      }
    }
  }

  const handleEnter = () => {
    if (endGame.attemptsLeft) {
      if (currentIdx.column === 5) {
        // need to send an axios request to our server, to check if word exists, if doesnt exist
        let tempArr = [board[currentIdx.row][0], board[currentIdx.row][1], board[currentIdx.row][2], board[currentIdx.row][3], board[currentIdx.row][4]];
        setSelectedLetters([...selectedLetters, ...tempArr]);
        if (tempArr.join('') === wordOTD) {
          setCurrentIdx({row: currentIdx.row + 1, column: 0});
          setEndGame({attemptsLeft: false, correct: true});
        } else {
          setCurrentIdx({row: currentIdx.row + 1, column: 0});
        }
      }
    }
  }

  const handleLetterSelect = (letter) => {
    if (endGame.attemptsLeft) {
      if (currentIdx.row < 6 && currentIdx.column < 5) {
        let tempBoard = board;
        tempBoard[currentIdx.row][currentIdx.column] = letter;
        setBoard(tempBoard);
        setCurrentIdx({...currentIdx, column: currentIdx.column + 1})
      }
    }
  }

  useEffect(() => {
    if (currentIdx.row === 6) {
      setEndGame({attemptsLeft: false, correct: false});
    }
  }, [currentIdx])

  return (
    <AppCSS>
      <AllWordle.Provider value={{page, setPage, board, setBoard, currentIdx, setCurrentIdx, handleEnter, handleBackspace, handleLetterSelect, wordOTD, selectedLetters, setSelectedLetters, endGame, setEndGame}}>
        <React.Suspense fallback={<p>loading...</p>}>{renderView()}</React.Suspense>
      </AllWordle.Provider>

    </AppCSS>
  );
}

