import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
	const initialRedditLink = useSelector(
		(state) => state.reducer.initialRedditLink
	);

	if (!initialRedditLink) return null;
	return <Navigate to={`/${initialRedditLink}`} />;
}
