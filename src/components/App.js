
import Header from "./Header";
import Speakers from "./Speakers";
import { useState } from "react";

const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div
      className={
        theme == "light" ? "container-fluid light" : "container-fluid dark"
      }
    >
      <Header />
      <Speakers theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default App;
