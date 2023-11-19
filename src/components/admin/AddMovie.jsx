import React, { memo, useCallback, useState } from "react";
import Modal from "../../UI/Modal";
import { useEffect } from "react";
import MovieItem from "./MovieItem";
import axios from "axios";
import styled from "styled-components";
const API = "https://alihan-movie-eb195-default-rtdb.firebaseio.com/movie";

const AddMovie = () => {
  const [openModal, setOpenModal] = useState(false);
  const [movieName, setMovieName] = useState("");
  const [movieImage, setMovieImage] = useState("");
  const [movieRaiting, setMovieRaiting] = useState("");
  const [openPutModal, setOpenPutModal] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [deletedMovie, setDeletedMovie] = useState(false);
  const [movie, setMovie] = useState([]);
  const [isRequest, setIsRequest] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(`${API}.json`);
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
  }, [isRequest]);

  const toggleModal = useCallback(() => {
    setOpenModal((prev) => !prev);
    setError("");
  }, []);

  const postMovie = async () => {
    try {
      if (
        movieName.trim() !== "" &&
        movieImage.trim().startsWith("data") &&
        movieDescription.trim().length > 10 &&
        !isNaN(movieRaiting) &&
        movieRaiting > 0 &&
        movieRaiting <= 5
      ) {
        await axios.post(`${API}.json`, {
          name: movieName,
          image: movieImage,
          raiting: movieRaiting,
          description: movieDescription,
        });
        setIsRequest((prev) => !prev);
        setMovieName("");
        setMovieImage("");
        setMovieRaiting("");
        setMovieDescription("");
        toggleModal();
        setError("");
      } else {
        setError("Сураныч формалардын устундогу условияларды аткарыныз!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = useCallback(
    async (id) => {
      try {
        await axios.delete(`${API}/${id}.json`);
        setDeletedMovie(!deletedMovie);
        setIsRequest((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    },
    [deletedMovie]
  );

  const toggleModalPut = useCallback(() => {
    setOpenPutModal((prev) => !prev);
  }, []);

  const updateMovie = async (
    id,
    putName,
    putImage,
    putRaiting,
    putDescription
  ) => {
    try {
      await axios.put(`${API}/${id}.json`, {
        name: putName,
        image: putImage,
        raiting: putRaiting,
        description: putDescription,
      });
      toggleModalPut();
      setIsRequest((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const changeName = useCallback((e) => {
    setMovieName(e.target.value);
  }, []);
  const changeImage = useCallback((e) => {
    setMovieImage(e.target.value);
  }, []);
  const changeRaiting = useCallback((e) => {
    setMovieRaiting(e.target.value);
  }, []);
  const changeDescription = useCallback((e) => {
    setMovieDescription(e.target.value);
  }, []);

  console.log(movie);
  return (
    <>
      <StyledAddMovieButton onClick={toggleModal}>
        ADD-MOVIE
      </StyledAddMovieButton>
      <StyledConteiner>
        {movie.map((item) => (
          <MovieItem
            {...item}
            idi={item.id}
            deleteMovie={deleteMovie}
            toggleModalPut={toggleModalPut}
            openPutModal={openPutModal}
            updateMovie={updateMovie}
            key={item.id}
          />
        ))}
      </StyledConteiner>

      {openModal && (
        <Modal onClose={toggleModal}>
          <StyledModalConteiner>
            <StyledLabel>Форма пустой болбош керек! </StyledLabel>
            <StyledModalInput
              type="text"
              value={movieName}
              onChange={changeName}
              placeholder="Enter movie name..."
            />
            <StyledLabel>
              Форма data деген соз менен башталуу керек!
            </StyledLabel>
            <StyledModalInput
              type="text"
              value={movieImage}
              onChange={changeImage}
              placeholder="Enter URL image..."
            />
            <StyledLabel>Форма 10 создон аз болбош керек!</StyledLabel>
            <StyledModalInput
              type="text"
              value={movieDescription}
              onChange={changeDescription}
              placeholder="Enter movie description..."
            />
            <StyledLabel>Формага 0 дон 5 ке чейин эле жаза аласыз!</StyledLabel>
            <StyledModalInput
              type="number"
              value={movieRaiting}
              onChange={changeRaiting}
              placeholder="Enter movie raiting..."
            />
          </StyledModalConteiner>
          <StyledError>{error}</StyledError>
          <StyledModalAddButton onClick={postMovie}>ADD</StyledModalAddButton>
        </Modal>
      )}
    </>
  );
};

export default memo(AddMovie);

const StyledModalConteiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledModalInput = styled.input`
  width: 24rem;
  height: 2rem;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
`;

const StyledModalAddButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: green;
  margin-top: 1rem;
  margin-right: 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const StyledConteiner = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  padding: 2rem;
`;

const StyledAddMovieButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: blue;
  margin-top: 1rem;
  margin-right: 1rem;
  position: absolute;
  right: 0.2rem;
  top: 0rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
const StyledError = styled.p`
  color: red;
`;
const StyledLabel = styled.label`
  color: blue;
`;
