import "./App.css";
import Dpad from "../Dpad";
import Game from "../Game";
import Select from "../Select";
import hasTouch from "../touch";
import { useEffect, useState } from "react";

const { clientWidth, clientHeight } = document.body;

const App = () => {
  const [landscape, setLandscape] = useState(clientWidth > clientHeight);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = document.body;
      setLandscape(clientWidth > clientHeight);
    });

    observer.observe(document.body);
  }, []);

  return (
    <div className={`App ${landscape ? "landscape" : "portrait"}`}>
      {hasTouch ? (
        <>
          {landscape ? <Dpad landscape={landscape} /> : null}
          <Game landscape={landscape} full={false} />
          {landscape ? null : <Dpad landscape={landscape} />}
          <Select landscape={landscape} />
        </>
      ) : (
        <Game landscape={landscape} full={true} />
      )}
    </div>
  );
};

export default App;
