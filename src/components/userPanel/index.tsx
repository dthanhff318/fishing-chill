import { useEffect, useRef } from "react";
import StyledUserPanel from "./UserPanel.style";
import { getAssetByName } from "../../utils/common";
import useAssets from "../../store/useAssets";
import * as fabric from "fabric";

const UserPanel = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const { assets } = useAssets();

  //   const drawCanvas = (ctx) => {
  //     if (!canvasRef.current) return;

  //     const imgWidth = 770;
  //     const imgHeight = 290;

  //     ctx.clearRect(0, 0, 800, 300);
  //     ctx.drawImage(
  //       getAssetByName("common-user-panel", assets),
  //       0,
  //       0,
  //       imgWidth,
  //       imgHeight,
  //       0,
  //       0,
  //       360,
  //       50
  //     );
  //   };

  //   const updateCanvas = () => {
  //     const canvas = canvasRef.current as unknown as HTMLCanvasElement;
  //     const ctx = canvas.getContext("2d");

  //     drawCanvas(ctx);
  //     requestAnimationFrame(updateCanvas);
  //   };

  //   useEffect(() => {
  //     const animationId = requestAnimationFrame(updateCanvas);
  //     return () => {
  //       cancelAnimationFrame(animationId);
  //     };
  //   }, []);
  const updateCanvasContext = async (canvas: any) => {
    if (!canvas) return;
    const text = new fabric.FabricText("Hello, Fabric.js!", {
      left: 100, // Vị trí X của văn bản
      top: 100, // Vị trí Y của văn bản
      fontSize: 38, // Kích thước font
      fontFamily: "Pixelify Sans", // Kiểu chữ
      fill: "blue", // Màu chữ
    });

    const imgElement = document.getElementById("myImage") as HTMLImageElement;

    // Tạo đối tượng fabric.Image từ phần tử img
    const img = new fabric.FabricImage(imgElement, {
      left: 0,
      top: 0,
      angle: 0,
    });

    canvas.add(img);

    // Thêm văn bản vào canvas
    canvas.add(text);
    // canvas.add(image);
    canvas.renderAll();
  };

  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(
      canvasEl.current as HTMLCanvasElement,
      options
    );
    updateCanvasContext(canvas);
    return () => {
      updateCanvasContext(null);
      canvas.dispose();
    };
  }, []);
  return (
    <StyledUserPanel width={800} height={300} ref={canvasEl}>
      <img
        id="myImage"
        src="/assets/common/userPanel.png"
        style={{ display: "none" }}
      />
    </StyledUserPanel>
  );
};
export default UserPanel;
