import React from 'react'
import styled from 'styled-components'
import Cardobj from './cardobj'


function Card(props) {
  return (
    <Container>
      <div className='row'>
        <h1>{props.title}</h1>
        <div className="posters">
          
          {props.movies.map((obj) =>
             <Cardobj item={props.item} isSmall={props?.isSmall} movie={obj} />

          )}

        </div>
      </div>
    </Container>
  )
}

export default Card;

const Container = styled.div`
    .row{
    margin-left: 20px;
    color: #fff;


.posters{
    display: flex;
    padding: 20px;
    overflow-x: scroll;
    overflow-y: hidden;


&::-webkit-scrollbar{
    display: none;
}

.poster{
    max-height: 230px;
    margin-right: 10px;
    cursor: pointer; 
}

.smallPoster{
    max-height: 150px;
    margin-right: 10px;
    cursor: pointer;
&:hover{
    transform: scale(1.1);    
}
}
}
    }
    @media (max-width : 1100px){
      .row{
      .posters{
      .poster{
    max-height: 190px;}
      }
    }
    }
    @media (max-width : 800px){
      .row{
        h1{
          font-size: 20px;
        }
      .posters{
      .poster{
    max-height: 125px;}
      }
    }
    }
`;