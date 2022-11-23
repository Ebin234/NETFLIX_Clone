import React, { useEffect, useState } from 'react'
import Banner from "../Components/Banner/Banner";
import { Originals,Trending,Action,Comedy,Horror,Crime} from '../Utils/Constants/Url'
import NavBar from "../Components/NavBar/Navbar";
import Card from "../Components/Card/Card";
import { firebaseAuth } from '../Utils/firebase/config';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies, getGenres } from '../Store/Redux/index'

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
  const netflixOriginals = useSelector((state) => state.netflix.netflixOriginals)
  const trendingCat = useSelector((state)=> state.netflix.trending)
  const actionCat = useSelector((state)=>state.netflix.actionCat)
  const comedyCat = useSelector((state)=>state.netflix.comedyCat)
  const horrorCat = useSelector((state)=>state.netflix.horrorCat)
  const crimeCat = useSelector((state)=>state.netflix.crimeCat)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) {
      navigate('/login')
    }
  })
  useEffect(() => {
    dispatch(getGenres())
  }, [])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: Originals }))
  }, [genresLoaded])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: Trending }))
  }, [genresLoaded])
  
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: Action }))
  }, [genresLoaded])
  
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: Comedy }))
  }, [genresLoaded])
  
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: Horror }))
  }, [genresLoaded])
  
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: Crime }))
  }, [genresLoaded])

  return (

    <div>
      <NavBar isScrolled={isScrolled} />
      <Banner movie={trendingCat[0]} />
      <Card  title='Netflix Originals' item="tv" movies={netflixOriginals} />
      <Card  title='Trending' item="movie"  movies={trendingCat} />
      <Card  title='Action' item="movie" movies={actionCat} />
      <Card  title='Comedy' item="movie" movies={comedyCat} />
      <Card  title='Horror' item="movie" movies={horrorCat} />
      <Card  title='Crime' item="movie" movies={crimeCat} /> 
    </div>

  )
}

export default Home;
