import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { ServerSideProps } from "../types"; //TODO: make relative imports for types in tsconfig

export function render(_url: string, serverSideProps: ServerSideProps) {
  const html = renderToString(
    <StrictMode>
      <App serverSideProps={serverSideProps} />
    </StrictMode>,
  );
  return { html };
}
