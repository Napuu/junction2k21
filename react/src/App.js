import './App.css';
import Map from './Map';
import Sidebar from './components/Sidebar';
import { HashRouter } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const [dateValue, setDateValue] = useState([new Date(), new Date()]);
  useEffect(() => {
    console.log(dateValue);
  }, [dateValue]);
  return (
    <HashRouter>
      <Map
        dateValue={dateValue}
        style={{ zIndex: -1 }}
      />
      <div style={{ position: 'absolute', right: '0px', margin: '32px', boxSizing: 'border-box' }}>
        <Sidebar setDateValue={setDateValue} dateValue={dateValue} />
      </div>
    </HashRouter>
  );
}

export default App;
