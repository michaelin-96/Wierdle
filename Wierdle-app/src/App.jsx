import React, {useState, useContext, useEffect, createContext} from 'react';
import styled from 'styled-components';
const Homepage = React.lazy(() => import('./Homepage/Homepage.jsx'));
const WOTD = React.lazy(() => import('./WOTD/WOTD.jsx'));
const Stats = React.lazy(() => import('./Stats/Stats.jsx'));

export const AllWordle = createContext();

const AppCSS = styled.div`
  text-align: center;
  background-color: #5a6375;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fafafa;
`

export default function App () {

  const [page, setPage] = useState('homepage');


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


  return (
    <AppCSS>
      <AllWordle.Provider value={{page, setPage}}>
        <React.Suspense fallback={<p>loading...</p>}>{renderView()}</React.Suspense>
      </AllWordle.Provider>

    </AppCSS>
  );
}

