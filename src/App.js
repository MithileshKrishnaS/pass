import './App.css';
import {BrowserRouter, Route}from 'react-router-dom';
import { Routes } from 'react-router';
import Key from './components/Key';
import User from './components/User';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  const [key,setKey]=useState();

  function handleKey(data)
  {
    setKey(data);
  }

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/pass" exact  element={<Home data={handleKey}></Home>}></Route>
            <Route path="/key" exact element={<Key ></Key>}></Route>
            <Route path="/user" exact element={<User data={key}></User>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
