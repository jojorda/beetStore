import React from "react";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@material-tailwind/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

axios.defaults.withCredentials = false;
const container = document.getElementById("root");
const root = createRoot(container);
const { PUBLIC_URL } = import.meta.env;
// console.log(import.meta.env.VITE_API_KEY);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store} basename={PUBLIC_URL}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
