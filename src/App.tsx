import { useState } from "react";
import "./App.css";
import MainScene from "./scenes/main";
import LoadingScene from "./scenes/loading";

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <main className="container">
      {loading ? <LoadingScene /> : <MainScene />}
    </main>
  );
}

export default App;
