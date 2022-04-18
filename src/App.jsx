import { Route, Routes } from "react-router-dom";
import GenerateCatFact from "./components/GenerateCatFact";
import PublicLayout from "./components/layout/public";
import SubRedditLinks from "./components/layout/SubRedditLinks/SubRedditLinks";
import Awards from "./pages/Awards/Awards";
import Home from "./pages/Home";
import SubReddit from "./pages/SubReddit/SubReddit";
import SubRedditPost from "./pages/SubRedditPost/SubRedditPost";

function App() {
	return (
		<GenerateCatFact>
			<Routes>
				<Route path="/" element={<PublicLayout />}>
					<Route path="" element={<SubRedditLinks />}>
						<Route index element={<Home />} />
						<Route path="/:subReddit" element={<SubReddit />} />
					</Route>
					<Route path="/:subReddit/:postId" element={<SubRedditPost />} />
					<Route path="awards" element={<Awards />} />
				</Route>
			</Routes>
		</GenerateCatFact>
	);
}

export default App;
