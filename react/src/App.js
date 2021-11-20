import './App.css';
import Map from './Map';
import Sidebar from './components/Sidebar';
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Map
        style={{ zIndex: -1 }}
      />
      <div style={{ position: 'absolute', right: '0px', margin: '32px', boxSizing: 'border-box' }}>
        <Sidebar />
      </div>
    </HashRouter>
  );
}

export default App;
