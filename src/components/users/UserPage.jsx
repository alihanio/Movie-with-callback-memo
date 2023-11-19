import axios from "axios";
import React, { memo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserPage = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(
          "https://alihan-movie-eb195-default-rtdb.firebaseio.com/movie.json"
        );
        const movieArr = [];
        for (let key in response.data) {
          movieArr.push({
            id: key,
            name: response.data[key].name,
            image: response.data[key].image,
            raiting: response.data[key].raiting,
          });
        }
        setMovie(movieArr);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, []);
  return (
    <StyledBoxConteiner>
      {movie.map(({ name, image, raiting, id }) => (
        <Link to={id.toString()} className="link" key={id}>
          <StyledConteiner>
            <StyledImage src={image} alt="movie-image" />
            <StyledHeading>{name}</StyledHeading>
            <StyledStar>star {raiting}/5</StyledStar>
          </StyledConteiner>
        </Link>
      ))}
    </StyledBoxConteiner>
  );
};

export default memo(UserPage);
const StyledConteiner = styled.div`
  width: 20rem;
  height: 24rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem;
`;

const StyledImage = styled.img`
  width: 16rem;
  height: 18rem;
`;
const StyledHeading = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;
const StyledStar = styled.p`
  font-size: 1rem;
  color: grey;
`;
const StyledBoxConteiner = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: 2rem;
`;
