import { ServerSideProps } from "./types";

declare global {
  interface Window {
    __HYDRATION_DATA__: ServerSideProps;
  }
}

export {}; // Makes sure this is treated as a module and not just a script
