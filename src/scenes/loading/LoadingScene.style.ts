import styled from "styled-components";

export const StyledLoadingScene = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo-img {
    width: 40px;
    height: 40px;
  }
  .game-title {
    font-weight: 600;
    font-size: 28px;
  }
`;
