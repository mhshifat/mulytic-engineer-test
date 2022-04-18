import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styles from "./SubRedditPost.module.css";

const GET_SUB_REDDIT_POST = ({ queryKey }) => {
	const [, { redditName, postId, ...args }] = queryKey;
	return axios({
		url: `https://www.reddit.com/r/${redditName}/comments/${postId}.json`,
		method: "GET",
		params: args,
	});
};
export default function SubRedditPost() {
	const { subReddit, postId } = useParams();
	const { data: redditPost } = useQuery(
		[GET_SUB_REDDIT_POST.name, { redditName: subReddit, postId }],
		GET_SUB_REDDIT_POST,
		{
			enabled: !!subReddit && !!postId,
		}
	);

	return (
		<div className={styles.SubRedditPost}>
			<h3>{redditPost?.data?.[0]?.data?.children?.[0]?.data?.title}</h3>
		</div>
	);
}
