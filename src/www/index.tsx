import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

import * as $ from "jquery";
(window as any).jQuery = (window as any).$  = $;

require("./index.html");

const element = document.getElementById("example");
if (element) {
    ReactDOM.render(
        <App framework="TypeScript" />,
        document.getElementById("example"),
    );
}