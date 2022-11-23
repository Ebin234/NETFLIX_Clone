import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoPlayCircleSharp } from 'react-icons/io5'
import { RiThumbDownFill, RiThumbUpFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { imageUrl, API_KEY } from '../../Utils/Constants/Constants'
import styled from 'styled-components'
import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../../Utils/firebase/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeFromLikedMovies } from '../../Store/Redux'
import { axiosTMDB } from '../../Utils/Axios/axios'

function Cardobj(props) {
    const [isHoverd, setIsHovered] = useState(false);
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) setEmail(user.email)
        else navigate('/login')
    })

    const movieTrailer = (id)=>{
        axiosTMDB.get(`/${props.item}/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
                console.log("response",response);
                if (response.data.results.length !== 0) {
                navigate('/player',{state:response.data.results[0]})
                } else {
                  console.log('Empty Array');
                }
              })
    }
    const addToList = async () => {
        console.log("asasdasdas");
        try {
          let obj = {
                data: props.movie,
                item:props.item
            } 
            await axios.post("https://my-netflix-cloneapp.herokuapp.com/api/user/add", { email  , obj })
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Container  onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <img  className={props.isSmall ? 'smallPoster' : 'poster'} src={`${imageUrl + props.movie.image}`} alt="Poster" />

            {isHoverd  && <div  className="info-container flex column">
                <h3 className="name"  >{props.movie.name}</h3>
                <div className="icons flex j-between">
                    <div className="controls flex">
                        <IoPlayCircleSharp
                            title='play'
                            onClick={()=>
                                movieTrailer(props.movie.id)
                            }
                        />
                        <RiThumbUpFill title='Like' />
                        <RiThumbDownFill title='Dislike' />
                        {
                            props.isLiked ?
                                < BsCheck title='Remove From List' onClick={() => dispatch(removeFromLikedMovies({ movieId: props.movie.id, email }))} /> :
                                <AiOutlinePlus title='Add To My List' onClick={addToList} />

                        }
                    </div>
                </div>
                <div className="genres flex">
                    <ul className="flex">{props.movie.genres.map((genre) => <li id='genre'>{genre}</li>)}</ul>
                </div>
            </div>

            }
        </Container>
    )
}

export default Cardobj

const Container = styled.div`
.info-container{
        gap: 0.5rem;
    margin-top: -110px;
    .name{
        padding-left: 10px;
    }
.icons{


padding-left: 10px;

        .controls{
            display: flex;
            gap: 1rem;
        }
        svg{
            font-size: 2rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover{
                color: #b8b8b8;
                
            }
        }
    }
    .genres{
        margin-left: 20px;
        padding-left: 10px;
        margin-bottom: 10px;
        ul{
            li{
                margin-right: 2rem;
            }
        }
    }
  }
  .show{
    display: none;
  }
@media (max-width:1100px){
     .info-container {
    gap: 0.5rem;
    margin-top: -130px;
    .name{
        max-width: 328px;
    }
     .genres { ul {li {
    margin-right: 1.8rem;
}
     }
}
}
     
  }
  @media (max-width:800px){
    .info-container{
        margin-top: -122px;
        margin-bottom: 2rem;
         .name {
    max-width: 178px;
    font-size: 12px;    
    max-width: 312px;
    font-size: 17px;
}
}
.icons{ .controls {
    gap: 9px;
    svg{
            font-size: 1rem;
    }
}
}
.genres {
    margin-left: 12px;
    padding-left: 5px;
    ul{
         li {
    font-size: 12px;
    margin-right: 20px;
         }
}
}}
`;