import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLikedMovies } from '../Store/Redux';
import { firebaseAuth } from '../Utils/firebase/config';
import Navbar from '../Components/NavBar/Navbar'
import styled from 'styled-components';
import NotMyList from '../Components/Select/NotMyList';
import Card from '../Components/Card/cardobj';

export default function MyList() {

    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const movies = useSelector((state)=>state.netflix.myList)
    
    const [email,setEmail] = useState("")

    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) setEmail(user.email)
        else navigate('/login')
      })

    useEffect(()=>{
        
      if(email) dispatch(getUserLikedMovies(email))
      
    },[email])
  
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    }
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
            { movies.length ? 
            movies.map((movie,index)=>{
              console.log("mymovies",movie);
                return <Card item={movie.item} movie={movie.data} index={index} key={movie.data.id} isLiked={true} />
            }) 
            : <NotMyList />
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
            margin-left: 3rem;
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