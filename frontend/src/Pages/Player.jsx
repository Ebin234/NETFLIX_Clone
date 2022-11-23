import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BsArrowLeft } from 'react-icons/bs';
import YouTube from 'react-youtube';




export default function Player(props) {
    const navigate = useNavigate()
     const location = useLocation();
     console.log("location",location);
    const opts= {
        height: '640',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
      };
    return (
        <Container>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <YouTube videoId={location.state.key} opts={opts} />
            </div>
        </Container>
    )
}

const Container = styled.div`
    .player{
        width: 100vw;
        height: 100vh;
        .back{
            position: absolute;
            padding: 2rem;
            z-index: 1;
            svg{
                font-size: 3rem;
                cursor: pointer;
            }
        }
    }
    @media (max-width:1100px){
        display: flex;
            justify-content: center;
            align-items: center;
        .player{
            padding: 10rem 1rem;
            
            width: 100vw;
            height:100vh;
        }
    }
    @media (max-width:800px){
        .player{
            padding: 8rem 2rem;
        }
    }
`;