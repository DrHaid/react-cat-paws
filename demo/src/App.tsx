import GitHubLogo from "./assets/github.svg";
import NPMLogo from "./assets/npm.svg";
import "./App.css";

export const App = () => {
  return (
    <>
      <h1>React - CatPaws🐾</h1>
      <div>
        <button
          onClick={() => ({
            /* TODO: actually add the cat paws */
          })}
        >
          Click me!
        </button>
      </div>
      <div>
        <pre>npm install react-cat-paws</pre>
      </div>
      <div>
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
