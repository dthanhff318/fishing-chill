import { Assets } from "pixi.js";

export const loaderAsset = async () => {
  const assets = [
    { name: "bunny", src: "https://pixijs.com/assets/bunny.png" },
  ];
  const resources = await Assets.load(assets);
  return resources;
};
