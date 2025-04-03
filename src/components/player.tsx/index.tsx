import { useEffect, useRef } from "react";
import { StyledPlayer } from "./Player.style";

const PULL_BAR_HEIGHT = 200;
const PULL_BAR_WIDTH = 30;
const PULL_BAR_BORDER_WIDTH = 10;

const FISH_BAR_HEIGHT = 70;
const USER_BAR_HEIGHT = 20;

const Player = () => {
  const canvasRef = useRef(null);
  const fishPositionRef = useRef(0);
  const userPositionRef = useRef(0);
  const isUpRef = useRef(false);
  const timeoutUserRef = useRef<number | null>(null);
  const directionFishBarRef = useRef<string>("up");

  // Tạo tốc độ di chuyển
  const userSpeed = 1.1;
  const fishSpeed = 1;

  // Hàm vẽ trên canvas
  const drawCanvas = (ctx) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, PULL_BAR_WIDTH, PULL_BAR_HEIGHT);

    ctx.lineWidth = PULL_BAR_BORDER_WIDTH;
    ctx.strokeStyle = "#873e23";
    ctx.strokeRect(0, 0, PULL_BAR_WIDTH, PULL_BAR_HEIGHT);
    // Fish area
    ctx.fillStyle = "blue";
    ctx.fillRect(
      0 + PULL_BAR_BORDER_WIDTH / 2,
      fishPositionRef.current,
      PULL_BAR_WIDTH - PULL_BAR_BORDER_WIDTH,
      FISH_BAR_HEIGHT
    );

    // User area
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      0 + PULL_BAR_BORDER_WIDTH / 2,
      userPositionRef.current,
      PULL_BAR_WIDTH - PULL_BAR_BORDER_WIDTH,
      USER_BAR_HEIGHT
    );
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current;
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
      <canvas
        ref={canvasRef}
        width={PULL_BAR_WIDTH}
        height={PULL_BAR_HEIGHT}
      ></canvas>
      <button onClick={handleCatch}>Catch</button>
    </StyledPlayer>
  );
};

export default Player;
