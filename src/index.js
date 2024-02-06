import React from "react";
import {createRoot} from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import ResetStyle from './styles/ResetStyle.js';
import GlobalStyle from './styles/GlobalStyle.js';
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<React.StrictMode>
    <ResetStyle/>
    <GlobalStyle/>
    <App/>
  </React.StrictMode>,);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
