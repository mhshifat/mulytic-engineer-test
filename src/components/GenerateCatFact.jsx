import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const getFact = (params) => {
	return axios({
		params,
		method: "GET",
		url: "https://catfact.ninja/fact",
	});
};
export default function GenerateCatFact({ children }) {
	const { mutateAsync: getFactMutation } = useMutation(getFact);

	// Cat Facts API Implementation
	useEffect(() => {
		const sendToast = async () => {
			const { data } = await getFactMutation();
			toast((t) => (
				<div className="catsFact">
					<h3 className="catsFact__title">Fact...</h3>
					<p className="catsFact__fact">{data.fact}</p>
				</div>
			));
		};
		sendToast();
		const timer = setInterval(() => {
			sendToast();
		}, 60000);

		return () => clearInterval(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
}
