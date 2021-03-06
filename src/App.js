import './App.css';
import Map from './Map';
import Sidebar from './components/Sidebar';
import { HashRouter } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    dateValue: new Date("2019-11-15"),
    transmissionPower: 2
  });
  return (
    <HashRouter>
      <Map
        state={state}
      />
      <div style={{ position: 'absolute', right: '0px', margin: '32px', boxSizing: 'border-box' }}>
        <Sidebar state={state}┬ásetState={setState} />
      </div>
    </HashRouter>
  );
}

export default App;
