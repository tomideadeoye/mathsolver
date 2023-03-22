import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import theme from "./assets/theme";
import "./index.css";
import { ThemeProvider } from "@material-ui/core";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>
);
