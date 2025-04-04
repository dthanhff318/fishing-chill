import { useEffect, useState } from "react";
import "./App.css";
import MainScene from "./scenes/main";
import LoadingScene from "./scenes/loading";
import useAssets from "./store/useAssets";

function App() {
  const [loading, setLoading] = useState(true);
  const { setAssets } = useAssets();
  const loadImage = (imageData: any) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageData.src;
      image.onload = () =>
        resolve({
          name: imageData.name,
          img: image,
        });
      image.onerror = (err) => reject(err);
    });
  };

  const loadImages = async () => {
    const imagePaths = [
      { name: "BGPLAY", src: "/bg-play.png" },
      { name: "TEST", src: "/progressbar.png" },
      { name: "fishingBar", src: "/fishingbar.png" },
      { name: "fishingCatch", src: "/fishCatch.png" },
    ];

    try {
      const images = await Promise.all(imagePaths.map(loadImage));
      setAssets(images);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setLoading(false);
    } catch (err) {
      console.error("Error loading images", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);
  return (
    <main className="container">
      {loading ? <LoadingScene /> : <MainScene />}
    </main>
  );
}

export default App;
