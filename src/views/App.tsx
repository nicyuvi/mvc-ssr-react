import "./App.css";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { ServerSideProps } from "../types";

function App({ serverSideProps }: { serverSideProps: ServerSideProps }) {
  const [count, setCount] = useState(0);
  const { user } = serverSideProps;

  return (
    <>
      <div>
        <p>server side props:</p>
        <div>{user?.id}</div>
        <div>{user?.name}</div>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
