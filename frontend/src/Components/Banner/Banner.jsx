import React from 'react'
import { API_KEY, imageUrl } from '../../Utils/Constants/Constants'
import styled from 'styled-components'
import { axiosTMDB } from '../../Utils/Axios/axios';
import { useNavigate } from 'react-router-dom';

function Banner({movie}) {
  const navigate = useNavigate()
  const movieTrailer = (id)=>{
    axiosTMDB.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
            console.log("response",response);
            if (response.data.results.length !== 0) {
            navigate('/player',{state:response.data.results[0]})
            } else {
              console.log('Empty Array');
            }
          })
        }

  return (
    <Container>
      <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.image : ""})` }} className='banner'>
        <div className="content">
          <h1 className="title">{movie ? movie.name : ""}</h1>
          <div className="banner_buttons">
            <button className="button" onClick={()=>
                                movieTrailer(movie.id)
                                
                            } >Play</button>
            <button className="button" onClick={()=>navigate('/mylist')}>My list</button>
          </div>
          <h1 className="description">{movie ? movie.description : ""}</h1>
        </div>
        <div className="fade_bottom"></div>
      </div>
    </Container>
  )
}

export default Banner;


const Container = styled.div`
.banner{
background-size: cover;
height: 100vh;
color: white;
.content{
padding-top: 300px;
height: 580px;
  padding-left: 50px;
.title{
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.3rem;
}

.button{
  color: white;
  outline: none;
  border: none;
  font-weight: 700;
  border-radius: 5px;
  padding-left: 3rem;
  padding-right: 3rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(51, 51, 51, 0.5);
  cursor: pointer;
  margin-right: 2rem;
}

.button:hover{
  color: black;
  background-color: #e6e6e6;
}

.description{
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-size: 1rem;
  height: 80px;
  max-width: 500px;
}
}
.fade_bottom{
  height: 9.4rem;
  background-image: linear-gradient(180deg,transparent,rgba(37,37,37,.61),#111);
}
}

@media (max-width : 1100px){
.banner {
  width: 100%;
  background-size: cover;
  height: 432px;
  color: white;
.content{
    padding-top: 110px;
    height: 333px;
    padding-left: 20px;
    .title{
      font-size: 2.7rem;
    }
    .description{
      width: 20rem;
      font-size: 14px;
    }
}
.fade_bottom{
  height: 6.4rem;
}
}

}
@media (max-width:800px){
  .banner{
    height: 230px;
    .content{
      padding-top: 83px;
      height: 208px;
      padding-left: 15px;
      .title{
        font-size: 1.4rem;
    }
    .description {
      width: 24rem;
      font-size: 10px;
      padding-top: 0.4rem;
    }
    
  }
  .fade_bottom{
      height: 2.4rem;
    }
}
}
`;