import { useEffect, useRef } from "react";
import { getAssetByName } from "../../utils/common.ts";
import { StyledMainScene } from "./MainScene.style";
import useAssets from "../../store/useAssets.ts";
import UserPanel from "../../components/userPanel/index.tsx";

const MainScene = () => {
  const canvasRef = useRef(null);
  const { assets } = useAssets();

  const drawCanvas = (ctx) => {
    if (!canvasRef.current) return;

    const canvasWidth = 700;
    const canvasHeight = 750;
    const imgWidth = 1200;
    const imgHeight = 1200;

    var hRatio = canvasWidth / imgWidth;
    var vRatio = canvasHeight / imgHeight;

    var ratio = Math.max(hRatio, vRatio);
    // var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvasWidth - imgWidth * ratio) / 2;
    var centerShift_y = (canvasHeight - imgHeight * ratio) / 2;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(
      getAssetByName("main-bg", assets),
      0,
      0,
      imgWidth,
      imgHeight,
      centerShift_x,
      centerShift_y,
      imgWidth * ratio,
      imgHeight * ratio
    );
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    drawCanvas(ctx);
    requestAnimationFrame(updateCanvas);
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(updateCanvas);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  return (
    <StyledMainScene>
      <canvas ref={canvasRef} width={700} height={750}></canvas>
      {/* <Player /> */}
      <UserPanel />
    </StyledMainScene>
  );
};
export default MainScene;
