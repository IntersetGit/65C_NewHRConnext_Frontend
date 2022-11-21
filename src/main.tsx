import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ConfigProvider theme={{
      token : {
        colorPrimary : '#FC6634'
      }
    }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </>
);
