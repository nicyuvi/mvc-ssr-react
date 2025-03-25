import { ServerSideProps } from "./types";

// NOTE: Adds __HYDRATION_DATA__ to window object
declare global {
  interface Window {
    __HYDRATION_DATA__: ServerSideProps;
  }
}

export { }; 
