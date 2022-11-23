import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres, } from '../Store/Redux/index';
import { firebaseAuth } from '../Utils/firebase/config';
import {TrendingMovies } from '../Utils/Constants/Url'
import Navbar from '../Components/NavBar/Navbar'
import NotAvailable from '../Components/Select/NotAvailable';
import styled from 'styled-components';
import SelectGenre from '../Components/Select/SelectGenre';
import Card from '../Components/Card/cardobj';

export default function Movies() {

  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
  const genres = useSelector((state)=>state.netflix.genres)
  const movies = useSelector((state) => state.netflix.dataByGenre)


  onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) navigate('/login')
  })

  useEffect(() => {
    dispatch(getGenres())
  }, [])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: TrendingMovies }))
  }, [genresLoaded])

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }


  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>Movies</h1>
        <div className='selectGenre'>
        <SelectGenre genres={genres} type={"movie"}  />
        </div>
        <div className="grid flex">
         { movies.length ? 
          movies.map((movie, index) => {
            return <Card item="movie" movie={movie} index={index} key={movie.id}  />
          }) : <NotAvailable />
        }
        </div>
      </div>
    </Container>
  )
}


const Container = styled.div`
    .content{
        margin: 2.3rem;
        margin-top: 8rem;
        gap: 3rem;
        h1{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 3rem;
        }
        .selectGenre{
          
            select{
            margin-left: 0px;
          
          }
        }
        .grid{
            flex-wrap: wrap;
            gap: 1rem;

            .poster{
                 max-height: 230px;
                margin-right: 10px;
                cursor: pointer;
            } 
        }
    }
    @media (max-width : 1100px){
      .content{
      .grid{
      .poster{
    max-height: 185px;
    margin-bottom: 20px;
  }
      }
    }
    }
`;