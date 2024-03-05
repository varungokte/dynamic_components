import React, { useState } from 'react';
import './App.css';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState("")

  const logStatus = (status: boolean, name: string) =>{
    setLogged(status);
    setName(name)
  }
  return (
    <BrowserRouter>
      <div className="App">
        <div className='d-flex m-3'>
          <div className='flex m-2'>
          <Link to="/">Home</Link>
          </div>
          <div className='flex m-2'>
            {logged?<button>Logout</button>:<Link to="login">Login</Link>}
            </div>
        </div>

      <Routes>
        <Route path="/" element={<Home logged={logged} name={name}/>}/>
        <Route path="login" element={<Login logStatus={logStatus}/>}/>
      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
