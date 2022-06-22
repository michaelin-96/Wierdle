import React, {useState, useContext, useEffect} from 'react';
import Homepage from './Homepage/Homepage.jsx';


export default function App () {

  const [page, setPage] = useState('homepage');
  const [homepage, setHomepage] = useState(true);


  return (
    <>

      {homepage ? <Homepage /> : <div>Placeholder</div>}

      {/* switch (page) {
        case 'homepage':
         { <Homepage />};
          break;
        case 'wordle':
          console.log('Starting Wordle');
          break;
        default:
          {<Homepage />};
          break;
      } */}
    </>
  );
}

