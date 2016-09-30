import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

import * as $ from "jquery";
(window as any).jQuery = (window as any).$  = $;

require("./index.html");
require("./assets/semantic.min.css");
require("./assets/semantic.min.js");

ReactDOM.render(
    <App framework="TypeScript" />,
    document.getElementById("example"),
);