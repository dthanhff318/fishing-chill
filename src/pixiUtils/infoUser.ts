import { Assets, Sprite, Container, Text, BitmapText } from "pixi.js";
import { FONT_FAMILY } from "../consts/common";

type TInfoUser = {
  name: string;
  level: number;
  tin: number;
};
const userInfoObject = {
  name: null as any,
  level: null as any,
  tin: null as any,
};
const createInfoUser = async (pixiApp: any) => {
  const userInfoPanel = new Container();
  userInfoPanel.x = 10;
  userInfoPanel.y = 10;
  userInfoPanel.zIndex = 1;
  const bgPanel = await Assets.load("/infoUserPanel.png");
  const bgPanelSprite = new Sprite(bgPanel);
  bgPanelSprite.x = 0;
  bgPanelSprite.y = 0;
  bgPanelSprite.width = 310;
  bgPanelSprite.height = 120;

  // Info
  userInfoObject.level = new Text(`LV318`, {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fill: 0x00ff00,
  });
  userInfoObject.level.x = 110;
  userInfoObject.level.y = 20;
  userInfoObject.name = new Text("Tizz", {
    fontSize: 24,
    fill: 0xffffff,
    align: "center",
    fontWeight: "bold",
  });
  userInfoObject.name.x = 100;
  userInfoObject.name.y = 300;

  userInfoPanel.addChild(bgPanelSprite);
  userInfoPanel.addChild(userInfoObject.level);
  userInfoPanel.addChild(userInfoObject.name);

  return userInfoPanel;
};

export const updateInfoUser = ({ name, level, tin }: Partial<TInfoUser>) => {
  userInfoObject.name.text = name;
};

export default createInfoUser;
