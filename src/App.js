import { useReducer } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';
import './App.css';
import { NavigateTo } from './Components/Navigate';
import Home from './Pages/Home';
import Playlist from './Pages/Playlist';

function App() {
  
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  window.forceUpdate = () => {forceUpdate()}
  return (
    <BrowserRouter>
      <div className="App">
        <div className='View'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/playlist/:path' element={<Playlist/>} />
          </Routes>
          { localStorage.getItem("mail") == null || localStorage.getItem("uid") == null || localStorage.getItem("name") == null ?
          <iframe className="loginFrame" src="https://login.theduck.ml/v3/auth/login&form=iframe&theme=dark&appId=420691" />
          :
          ''
          }
        </div>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
