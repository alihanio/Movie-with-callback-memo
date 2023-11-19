import axios from "axios";
import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const API = "https://alihan-movie-eb195-default-rtdb.firebaseio.com";

const MovieInfo = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`${API}/movie/${id}.json`);
        setMovie(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [id]);

  const orderPost = async (name, image, raiting) => {
    try {
      await axios.post(`${API}/order.json`, { name, image, raiting });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to=".." relative="path" className="back">
        Back to all movies
      </Link>
      <StyledConteiner>
        <StyledImage src={movie.image} alt="movie-image" />
        <StyledBox>
          <StyledHeading>{movie.name}</StyledHeading>
          <StyledDescription>{movie.description}</StyledDescription>
          <StyledStar>movies reiting {movie.raiting}/5</StyledStar>
          <StyledButton
            onClick={() => orderPost(movie.name, movie.image, movie.raiting)}
          >
            Order
          </StyledButton>
        </StyledBox>
      </StyledConteiner>
    </>
  );
};

export default memo(MovieInfo);

const StyledConteiner = styled.div`
width:1005;
  display: flex;
  gap 1rem;
  margin:1rem;
`;
const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-left: 3rem;
`;
const StyledImage = styled.img`
  width: 30rem;
  height: 40rem;
`;
const StyledHeading = styled.h1`
  text-align: center;
  font-size: 3rem;
`;
const StyledDescription = styled.p`
  text-align: start;
  font-size: 1.3rem;
  margin-top: 1rem;
`;
const StyledStar = styled.p`
  font-size: 1.3rem;
  color: black;
  text-align: start;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;
const StyledButton = styled.button`
  width: 5rem;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: orange;
  cursor: pointer;
  &:active {
    background-color: yellow;
  }
`;
