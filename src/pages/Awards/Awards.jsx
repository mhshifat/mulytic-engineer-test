import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../store";
import Modal from "react-modal";
import styles from "./Awards.module.css";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		minWidth: 400,
	},
};

Modal.setAppElement("#modal");

const GET_MOVIE = ({ name, ...args }) => {
	return axios({
		url: `http://www.omdbapi.com/?s=${name}&apikey=9bd58f3f`,
		method: "GET",
		params: args,
	});
};

const GET_MOVIE_BY_ID = ({ id, ...args }) => {
	return axios({
		url: `http://www.omdbapi.com/?i=${id}&apikey=9bd58f3f`,
		method: "GET",
		params: args,
	});
};

export default function Awards() {
	const dispatch = useDispatch();
	const movies = useSelector((state) => state.reducer.movies);
	const { mutateAsync: getMovie } = useMutation(GET_MOVIE);
	const { mutateAsync: getMovieById } = useMutation(GET_MOVIE_BY_ID);
	const [selectionMap, setSelectionMap] = useState({});
	const [openModal, setOpenModal] = useState(false);

	const getMovieHandler = useCallback(
		async (e) => {
			try {
				e.preventDefault();
				const value = e.target.search.value;
				const { data: movieDetails } = await getMovie({
					name: value,
				});
				const res = await Promise.all(
					movieDetails.Search.map(
						async (movie) => await getMovieById({ id: movie.imdbID })
					)
				);
				const movies = res.map((result) => result.data);
				dispatch(setMovies(movies));
			} catch (err) {
				console.error(err);
			}
		},
		[dispatch, getMovie, getMovieById]
	);

	const categories = useMemo(
		() => [
			...new Set(
				movies
					.map((m) => m.Genre.split(",").map((chunk) => chunk.trim()))
					.flat()
			),
		],
		[movies]
	);

	return (
		<div className={styles.Awards}>
			<form onSubmit={getMovieHandler} className={styles.AwardsSearchForm}>
				<input type="text" name="search" placeholder="Search by movie name" />
				<button type="submit">Search</button>
			</form>

			<div>
				{categories.map((cat) => (
					<div key={cat} className={styles.AwardsCategory}>
						<h3>{cat}...</h3>
						<br />
						<div>
							{movies
								.filter((m) => m.Genre.includes(cat))
								.map((m) => (
									<div
										key={m.imdbID}
										className={
											m.imdbID === selectionMap[cat]?.imdbID
												? styles.selectedNominee
												: ""
										}
									>
										<h3>{m.Title}</h3>
										<button
											onClick={() =>
												setSelectionMap((values) => ({ ...values, [cat]: m }))
											}
										>
											Select Nominee
										</button>
									</div>
								))}
						</div>
					</div>
				))}
			</div>

			{!!categories.length &&
				(categories.length === Object.keys(selectionMap).length ? (
					<button onClick={() => setOpenModal(true)}>
						Submit Ballot Button
					</button>
				) : (
					<p>Please select a nominee from each category</p>
				))}

			<Modal
				isOpen={openModal}
				onRequestClose={() => setOpenModal(false)}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div>
					<button onClick={() => setOpenModal(false)}>X</button>
				</div>
				<p>
					<center>Success</center>
				</p>
			</Modal>
		</div>
	);
}
