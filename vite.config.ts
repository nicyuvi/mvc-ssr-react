import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});

//TODO: Point to src for index.html
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
//
// // https://vite.dev/config/
// export default defineConfig({
//   root: 'src',  // Set the 'src' folder as the root directory
//   plugins: [react()],
//   build: {
//     outDir: '../dist',  // Specify where to output the built files (outside of 'src')
//   },
// })
