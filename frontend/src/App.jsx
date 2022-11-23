import React from "react";
import './App.css'
import {BrowserRouter , Route,Routes} from 'react-router-dom'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import TvShows from "./Pages/TvShows";
import Movies from "./Pages/Movies";
import MyList from "./Pages/MyList";
import Player from "./Pages/Player";


function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/tvshows" element={<TvShows />} /> 
      <Route exact path="/movies" element={<Movies />} /> 
      <Route exact path="/mylist" element={<MyList />} /> 
      <Route exact path="/player" element={<Player />} /> 
     </Routes>
    </BrowserRouter>
  );
}

export default App;
