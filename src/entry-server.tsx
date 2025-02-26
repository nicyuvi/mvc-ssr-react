import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
// import { ServerSideProps } from "./types";

export function render(_url: string, serverSideProps: unknown) {
  // console.log("entry server", serverSideProps);
  const html = renderToString(
    <StrictMode>
      <App serverSideProps={serverSideProps} />
    </StrictMode>,
  );
  return { html };
}
