import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./styles/globalStyle";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<Router>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
