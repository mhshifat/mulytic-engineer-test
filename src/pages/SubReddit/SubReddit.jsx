import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styles from "./SubReddit.module.css";

const GET_SUB_REDDIT_LIST = ({ queryKey }) => {
	const [, { redditName, ...args }] = queryKey;
	return axios({
		url: `https://www.reddit.com/r/${redditName}.json`,
		method: "GET",
		params: args,
	});
};
export default function SubReddit() {
	const { subReddit } = useParams();
	const { data: redditPosts } = useQuery(
		[GET_SUB_REDDIT_LIST.name, { redditName: subReddit }],
		GET_SUB_REDDIT_LIST,
		{
			enabled: !!subReddit,
		}
	);

	return (
		<div className={styles.SubReddit}>
			{redditPosts?.data?.data?.children?.map((post) => (
				<Link to={`/${subReddit}/${post.data.id}`} key={post.data.id}>
					<div>
						<h3>{post.data.title}</h3>
						<p>{post.data.description}</p>
					</div>
				</Link>
			))}
		</div>
	);
}
