import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<QueryClientProvider client={new QueryClient()}>
			<Provider store={store}>
				<Toaster
					position="bottom-right"
					toastOptions={{
						duration: 60000,
					}}
					reverseOrder={false}
				/>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	</>
);
