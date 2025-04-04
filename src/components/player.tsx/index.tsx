import { useEffect, useRef } from "react";
import { StyledPlayer } from "./Player.style";
import useAssets from "../../store/useAssets";
import { getAssetByName } from "../../utils/common";

const PULL_BAR_HEIGHT = 200;
const PULL_BAR_WIDTH = 30;

const FISH_BAR_HEIGHT = 80;
const USER_BAR_HEIGHT = 20;

const Player = () => {
  const { assets } = useAssets();
  const canvasRef = useRef(null);
  const fishPositionRef = useRef(0);
  const userPositionRef = useRef(0);
  const isUpRef = useRef(false);
  const timeoutUserRef = useRef<number | null>(null);
  const directionFishBarRef = useRef<string>("up");
  const scoreRef = useRef(0);

  // Tạo tốc độ di chuyển
  const userSpeed = 1.1;
  const fishSpeed = 1;

  // Hàm vẽ trên canvas
  const drawCanvas = (ctx) => {
    ctx.clearRect(0, 0, 400, 400);

    ctx.drawImage(
      getAssetByName("TEST", assets),
      50,
      0,
      PULL_BAR_WIDTH,
      PULL_BAR_HEIGHT
    );

    ctx.drawImage(
      getAssetByName("fishingBar", assets),
      50,
      fishPositionRef.current,
      PULL_BAR_WIDTH,
      FISH_BAR_HEIGHT
    );

    ctx.drawImage(
      getAssetByName("fishingCatch", assets),
      50 - PULL_BAR_WIDTH * 0.4,
      userPositionRef.current,
      PULL_BAR_WIDTH * 1.8,
      USER_BAR_HEIGHT * 1.4
    );

    ctx.fillStyle = "white"; // Màu chữ
    ctx.font = "30px Arial"; // Cỡ chữ và font chữ
    ctx.textAlign = "center"; // Căn giữa văn bản
    ctx.textBaseline = "middle"; // Căn giữa theo chiều dọc

    // Vẽ văn bản lên canvas
    ctx.fillText(scoreRef.current, 200, PULL_BAR_HEIGHT / 2);
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (fishPositionRef.current >= PULL_BAR_HEIGHT - FISH_BAR_HEIGHT) {
      directionFishBarRef.current = "up";
    } else if (fishPositionRef.current === 0) {
      directionFishBarRef.current = "down";
    }
    fishPositionRef.current =
      fishPositionRef.current +
      (directionFishBarRef.current === "up" ? -fishSpeed : fishSpeed);

    // Auto failing
    if (!isUpRef.current) {
      if (userPositionRef.current < PULL_BAR_HEIGHT - USER_BAR_HEIGHT) {
        userPositionRef.current += userSpeed * 1.5;
      }
    } else {
      userPositionRef.current -= userSpeed;
      if (userPositionRef.current <= 0) {
        isUpRef.current = false;
      }
    }

    if (
      userPositionRef.current >= fishPositionRef.current &&
      userPositionRef.current + USER_BAR_HEIGHT <=
        fishPositionRef.current + FISH_BAR_HEIGHT
    ) {
      scoreRef.current += 1;
    }
    drawCanvas(ctx);
    requestAnimationFrame(updateCanvas);
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(updateCanvas);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleCatch = () => {
    if (timeoutUserRef.current) {
      clearTimeout(timeoutUserRef.current);
    }
    isUpRef.current = true;
    timeoutUserRef.current = setTimeout(() => {
      isUpRef.current = false;
    }, 200);
  };

  return (
    <StyledPlayer>
      <canvas ref={canvasRef} width={400} height={400}></canvas>
      <button onClick={handleCatch}>Catch</button>
    </StyledPlayer>
  );
};

export default Player;
