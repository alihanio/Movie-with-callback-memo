import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <>
      <StyledBackdrop />
      <StyledModalConteiner>
        {children}
        <StyledCanselBtn onClick={onClose}>Cancel</StyledCanselBtn>
      </StyledModalConteiner>
    </>,
    document.getElementById("portal")
  );
};
export default Modal;

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
const StyledModalConteiner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  z-index: 1000;
  width: 30rem;
  border-radius: 1rem;
  text-align: center;
`;
const StyledCanselBtn = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;

  font-weight: bold;
  &:hover {
    background-color: lightblue;
    color: black;
  }
  &:focus {
    background-color: blue;
    color: white;
  }
`;
