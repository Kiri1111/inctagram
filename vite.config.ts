import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"
import { devDependencies, dependencies } from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/main.js"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "index",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: Object.keys({ ...devDependencies, ...dependencies }),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "React",
        },
      },
    },
  },
})
