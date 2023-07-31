import GitHubLogo from "./assets/github.svg";
import NPMLogo from "./assets/npm.svg";
import "./App.css";
import { useState } from "react";
import { CatPaws } from "react-cat-paws";

export const App = () => {
  const [showCatPaws, setShowCatPaws] = useState(false);

  return (
    <>
      {showCatPaws && (
        <CatPaws onClose={() => setShowCatPaws(false)} fillScreen />
      )}
      <h1>React - CatPaws🐾</h1>
      <div className="container">
        <button onClick={() => setShowCatPaws(true)}>Click me!</button>
      </div>
      <div className="container">
        <pre>npm install react-cat-paws</pre>
      </div>
      <div className="container">
        <a href="https://github.com/DrHaid/react-cat-paws">
          <img src={GitHubLogo} />
        </a>
        <a href="https://www.npmjs.com/package/react-cat-paws">
          <img src={NPMLogo} />
        </a>
      </div>
    </>
  );
};
