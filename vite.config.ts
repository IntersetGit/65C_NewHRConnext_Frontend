import { defineConfig } from "vite";
import { getThemeVariables} from "antd/dist/theme";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars : getThemeVariables({
        //   dark : true,
        //   compact : true
        // }),
        javascriptEnabled: true,
      },
    },
  },
});
