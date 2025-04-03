import { useEffect, useRef } from "react";
import { StyledPlayer } from "./Player.style";

const Player = () => {
  const canvasRef = useRef(null);
  const fishTopRef = useRef(60); // Vị trí của cá (catch-fish)
  const userPositionRef = useRef(0); // Vị trí của người chơi (catch-user)
  const isUpRef = useRef(false); // Cờ để di chuyển lên
  const canvasWidth = 100;
  const canvasHeight = 200;
  const timeoutUserRef = useRef<number | null>(null);
  const timeoutFishRef = useRef<number | null>(null);

  // Tạo tốc độ di chuyển
  const userSpeed = 1.5; // Tốc độ di chuyển cho user (catch-user)
  const fishSpeed = 0.5; // Tốc độ di chuyển chậm hơn cho fish (catch-fish)

  // Hàm vẽ trên canvas
  const drawCanvas = (ctx) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Fish area
    ctx.fillStyle = "blue";
    ctx.fillRect(0, fishTopRef.current, canvasWidth, 90);

    // User area
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, userPositionRef.current, canvasWidth, 40);
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Move random
    if (!timeoutFishRef.current) {
      const randomMove = Math.floor(Math.random() * 61) - 10;
      fishTopRef.current += randomMove * fishSpeed;
      const duration = Math.abs(randomMove) * 200;
      timeoutFishRef.current = setTimeout(() => {
        timeoutFishRef.current = null;
      }, duration);
    }

    // Auto failing
    if (!isUpRef.current) {
      if (userPositionRef.current < 160) {
        userPositionRef.current += userSpeed;
      }
    } else {
      userPositionRef.current -= userSpeed;
      if (userPositionRef.current <= 0) {
        isUpRef.current = false;
      }
    }

    // Vẽ lại canvas mỗi lần thay đổi
    drawCanvas(ctx);

    // Tiếp tục gọi updateCanvas để tiếp tục animation
    requestAnimationFrame(updateCanvas);
  };

  useEffect(() => {
    // Bắt đầu animation khi component mount
    requestAnimationFrame(updateCanvas);
  }, []); // Không có dependencies, chỉ chạy một lần khi component mount

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
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
      <button onClick={handleCatch}>Catch</button>
    </StyledPlayer>
  );
};

export default Player;
