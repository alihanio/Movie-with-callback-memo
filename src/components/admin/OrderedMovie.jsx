import axios from "axios";
import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
const API = "https://alihan-movie-eb195-default-rtdb.firebaseio.com";

const OrderedMovie = () => {
  const [ordered, setOrdered] = useState([]);
  useEffect(() => {
    const orderGet = async () => {
      try {
        const response = await axios.get(`${API}/order.json`);
        const movieArr = [];
        for (let key in response.data) {
          movieArr.push({
            id: key,
            name: response.data[key].name,
            image: response.data[key].image,
            raiting: response.data[key].raiting,
          });
        }
        setOrdered(movieArr);
      } catch (error) {
        console.log(error);
      }
    };
    orderGet();
  }, []);

  return (
    <>
      <StyledHeading>Ordered Movies</StyledHeading>
      <StyledCont>
        <h3>Movie-image</h3>
        <h3>Movie-title</h3>
        <h3>Movie-raiting</h3>
        <h3>Ordered</h3>
      </StyledCont>
      {ordered.map(({ name, image, raiting ,id}) => (
        <StyledCont key={id}>
          <StyledImage src={image} alt="movie-img" />
          <p>{name}</p>
          <p>star {raiting}/5</p>
          <p>Ordered</p>
        </StyledCont>
      ))}
    </>
  );
};

export default memo(OrderedMovie);

const StyledImage = styled.img`
  width: 2rem;
  height: 2rem;
`;

const StyledCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
`;
const StyledHeading = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
