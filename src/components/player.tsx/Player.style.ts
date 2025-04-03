import styled from "styled-components";

export const StyledPlayer = styled.div`
  .catch-wrapper {
    position: relative;
    width: 10px;
    height: 200px;
    background-color: black;
    .catch-fish {
      position: absolute;
      width: 100%;
      height: 40px;
      background-color: blue;
      transition: all linear 0.5s;
    }
    .catch-user {
      position: absolute;
      width: 100%;
      height: 20px;
      background-color: yellow;
      transition: all linear 0.5s;
    }
  }
`;
