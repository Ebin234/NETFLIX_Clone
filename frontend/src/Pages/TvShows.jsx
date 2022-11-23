import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres, } from '../Store/Redux/index';
import { firebaseAuth } from '../Utils/firebase/config';
import {TrendingTv } from '../Utils/Constants/Url'
import Navbar from '../Components/NavBar/Navbar'
import NotAvailable from '../Components/Select/NotAvailable';
import styled from 'styled-components';
import SelectGenre from '../Components/Select/SelectGenre';
import Card from '../Components/Card/cardobj';

export default function TvShows() {

  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded)
  const genres = useSelector((state)=>state.netflix.genres)
  const tvShows = useSelector((state) => state.netflix.dataByGenre)


  onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) navigate('/login')
  }) 

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ url: TrendingTv }))
  }, [genresLoaded])

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }


  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>TV Shows</h1>
        <div className='selectGenre'>
        <SelectGenre genres={genres} type={"tv"}  />
        </div>
        <div className="grid flex">
         { tvShows.length ? 
          tvShows.map((movie, index) => {
            return <Card item="tv" movie={movie} index={index} key={movie.id} />
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
    @media (max-width:800px){
      .content{
      .grid{
      .poster{
        margin-bottom: 15px;
      }
    }
  }
    }
`;