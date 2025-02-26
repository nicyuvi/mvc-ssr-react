import "./index.css";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

const serverSideProps = (window as any).__HYDRATION_DATA__;

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <App serverSideProps={serverSideProps} />
  </StrictMode>,
);
