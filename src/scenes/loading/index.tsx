import Player from "../../components/player.tsx";
import { StyledLoadingScene } from "./LoadingScene.style";

const LoadingScene = () => {
  return (
    <StyledLoadingScene>
      {/* <img className="logo-img" src="/fish-icon.jpg" alt="" /> */}
      <p className="game-title">Fishing chill</p>
    </StyledLoadingScene>
  );
};
export default LoadingScene;
