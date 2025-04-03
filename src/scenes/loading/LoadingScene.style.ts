import styled from "styled-components";

export const StyledLoadingScene = styled.div`
  width: 100%;
  height: 100%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url("/bg-loading.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .logo-img {
    width: 40px;
    height: 40px;
  }
  .game-title {
    font-weight: 800;
    font-size: 54px;
    color: #5af542;
    background-color: #333333;
    text-shadow: 2px 2px 0px #000000, -2px -2px 0px #000000,
      2px -2px 0px #000000, -2px 2px 0px #000000;
    transform: translateY(-100px);
  }
`;
