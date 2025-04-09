import { useEffect, useRef } from "react";
import StyledUserPanel from "./UserPanel.style";
import { getAssetByName } from "../../utils/common";
import useAssets from "../../store/useAssets";
import * as fabric from "fabric";

const UserPanel = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const { assets } = useAssets();

  const updateCanvasContext = async (canvas: any) => {
    if (!canvas) return;

    const text = new fabric.FabricText("t1zz", {
      left: 114,
      top: 24,
      fontSize: 18,
      fontWeight: 600,
      fontFamily: "Pixelify Sans",
      fill: "green",
    });

    const userPanelImg = document.getElementById(
      "userPanel"
    ) as HTMLImageElement;

    const levelBgImg = document.getElementById("levelBg") as HTMLImageElement;

    const userPanel = new fabric.FabricImage(userPanelImg, {
      left: 10,
      top: 16,
      angle: 0,
    });
    const levelBg = new fabric.FabricImage(levelBgImg, {
      left: -12,
      top: 84,
      angle: 0,
    });

    const userPanelGroup = new fabric.Group([userPanel, levelBg], {
      left: 0,
      top: 0,
      angle: 0,
    });

    userPanel.scaleToHeight(100);
    levelBg.scaleToHeight(40);

    canvas.add(text);
    canvas.add(userPanelGroup);
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
    <StyledUserPanel width={700} height={750} ref={canvasEl}>
      <img
        id="userPanel"
        src="/assets/common/userPanel.png"
        style={{ display: "none" }}
      />
      <img
        id="levelBg"
        src="/assets/common/levelBg.png"
        style={{ display: "none" }}
      />
    </StyledUserPanel>
  );
};
export default UserPanel;
