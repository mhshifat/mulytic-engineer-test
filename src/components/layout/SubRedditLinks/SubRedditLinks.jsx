import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { setInitialRedditLink } from "../../../store";
import styles from "./SubRedditLinks.module.css";

const GET_SUB_REDDIT_LIST = ({ queryKey }) => {
	const [, args] = queryKey;
	return axios({
		url: "https://www.reddit.com/subreddits.json",
		method: "GET",
		params: args,
	});
};
export default function SubRedditLinks() {
	const dispatch = useDispatch();
	const { data: redditLists } = useQuery(
		[GET_SUB_REDDIT_LIST.name, {}],
		GET_SUB_REDDIT_LIST,
		{
			onSuccess: ({ data }) =>
				dispatch(
					setInitialRedditLink(data?.data?.children?.[0]?.data?.display_name)
				),
		}
	);

	return (
		<div>
			<div className={styles.SubRedditLinks}>
				{redditLists?.data?.data?.children
					?.map((item) => item.data.display_name)
					.map((item) => (
						<Link to={`/${item}`} key={item}>
							{item}
						</Link>
					))}
			</div>
			<Outlet />
		</div>
	);
}
