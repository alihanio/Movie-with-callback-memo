import React, { memo, useCallback } from "react";
import Modal from "../../UI/Modal";
import { useState } from "react";
import styled from "styled-components";

const MovieItem = ({
  name,
  image,
  raiting,
  idi,
  deleteMovie,
  toggleModalPut,
  openPutModal,
  updateMovie,
}) => {
  const [putName, setPutName] = useState("");
  const [putImage, setPutImage] = useState("");
  const [putRaiting, setPutRaiting] = useState("");
  const [putDescription, setPutDescription] = useState("");
  const [error, setError] = useState();

  const deleteFunc = useCallback(() => {
    deleteMovie(idi);
  }, [deleteMovie, idi]);

  const updateName = useCallback((e) => {
    setPutName(e.target.value);
  }, []);
  const updateImage = useCallback((e) => {
    setPutImage(e.target.value);
  }, []);
  const updateRaiting = useCallback((e) => {
    setPutRaiting(e.target.value);
  }, []);
  const updateDescription = useCallback((e) => {
    setPutDescription(e.target.value);
  }, []);

  const updateMovieFunc = useCallback(() => {
    if (
      putName.trim() !== "" &&
      putImage.trim().startsWith("data") &&
      putDescription.trim().length > 10 &&
      !isNaN(putRaiting) &&
      putRaiting > 0 &&
      putRaiting <= 5
    ) {
      updateMovie(idi, putName, putImage, putRaiting, putDescription);
      setError("");
      setPutName("");
      setPutImage("");
      setPutDescription("");
      setPutRaiting("");
    } else {
      setError("Сураныч формалардын устундогу условияларды аткарыныз!");
    }
  }, [idi, putName, putImage, putRaiting, putDescription, updateMovie]);

  const close = () => {
    toggleModalPut();
    setError("");
    setPutName("");
    setPutImage("");
    setPutDescription("");
    setPutRaiting("");
  };

  return (
    <StyledConteiner key={idi}>
      <StyledImage src={image} alt="movie-img" />
      <StyledHeading>{name}</StyledHeading>
      <StyledStar> star {raiting}/5</StyledStar>
      <StyledButtonContainer>
        <StyledDeleteButton onClick={deleteFunc}>DELETE</StyledDeleteButton>
        <StyledUpdateButton onClick={toggleModalPut}>UPDATE</StyledUpdateButton>
      </StyledButtonContainer>
      {openPutModal && (
        <Modal onClose={close}>
          <StyledModalConteiner>
            <StyledLabel>Форма пустой болбош керек! </StyledLabel>

            <StyledModalInput
              type="text"
              value={putName}
              onChange={updateName}
              placeholder="Enter new movie name..."
            />
            <StyledLabel>
              Форма data деген соз менен башталуу керек!
            </StyledLabel>
            <StyledModalInput
              type="text"
              value={putImage}
              onChange={updateImage}
              placeholder="Enter new URL image..."
            />
            <StyledLabel>Форма 10 создон аз болбош керек!</StyledLabel>

            <StyledModalInput
              type="text"
              value={putDescription}
              onChange={updateDescription}
              placeholder="Enter new description..."
            />
            <StyledLabel>Формага 0 дон 5 ке чейин эле жаза аласыз!</StyledLabel>

            <StyledModalInput
              type="number"
              value={putRaiting}
              onChange={updateRaiting}
              placeholder="Enter new movie raiting..."
            />
          </StyledModalConteiner>
          <StyledError>{error}</StyledError>
          <StyledModalAddButton onClick={updateMovieFunc}>
            UPDATE
          </StyledModalAddButton>
        </Modal>
      )}
    </StyledConteiner>
  );
};

export default memo(MovieItem);

const StyledConteiner = styled.div`
  width: 20rem;
  height: 26rem;
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
const StyledButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;
const StyledDeleteButton = styled.button`
  padding: 0.4rem;
  border-radius: 0.5rem;
  border: none;
  background-color: red;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:active {
    background-color: orange;
  }
`;

const StyledUpdateButton = styled.button`
  padding: 0.4rem;
  border-radius: 0.5rem;
  border: none;
  background-color: green;
  color: white;
  cursor: pointer;
  font-weight: bold;
`;

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
  cursor: pointer;
  color: white;
`;
const StyledError = styled.p`
  color: red;
`;

const StyledLabel = styled.label`
  color: blue;
`;
