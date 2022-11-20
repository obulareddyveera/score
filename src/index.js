import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {store} from "./store";
import InitBoard from "./features/init";
import ScoreBoard from "./features/score";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InitBoard />,
  },
  {
    path: "/score",
    element: <ScoreBoard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
