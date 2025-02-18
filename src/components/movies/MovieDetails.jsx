import { useState, useEffect, useRef } from 'react';
import useKey from '../../hooks/useKey';
import StarRating from '../rating/StarRating';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [userRating, setUserRating] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const clickCountRef = useRef(0);
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
		imdbRating,
	} = movie;

	// check if the movie is already in my watched list
	const isWatched = watched.map((watchedMovie) => watchedMovie.imdbID).includes(selectedId);

	// get the watched movie's userRating
	const watchedUserRating = watched.find((watchedMovie) => watchedMovie.imdbID === selectedId)?.userRating;

	const handleAddToList = () => {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
			countRatingDecisions: clickCountRef.current,
		};

		onAddWatched(newWatchedMovie);
		onCloseMovie();
	};

	useKey('escape', onCloseMovie);

	useEffect(() => {
		// check the amount of clicks on the rating
		if (userRating) clickCountRef.current++;
	}, [userRating]);

	useEffect(() => {
		const getMovieDetails = async () => {
			try {
				setIsLoading(true);
				setError('');

				const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_MOVIE_API}&i=${selectedId}`);

				if (!res.ok) throw new Error('Something went wrong with fetching movie');

				const data = await res.json();
				if (data.Response === 'False') throw new Error('Movie not found');

				setMovie(data);
			} catch (err) {
				console.log(err.message);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		getMovieDetails();
	}, [selectedId]);

	// update the page title
	useEffect(() => {
		if (!title) return;
		document.title = `Movie Mate | ${title}`;

		return () => (document.title = 'Movie Mate'); // clearn up
	}, [title]);

	return (
		<div className="details">
			{isLoading && <Loader />}
			{error && <ErrorMessage message={error} />}

			{!isLoading && !error && (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>

						<img src={poster} alt={`Poster of ${movie}`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>

					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StarRating maxRating={10} size={22} onSetRating={setUserRating} />
									{userRating > 0 && (
										<button className="btn-add" onClick={handleAddToList}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>You already rated with movie 🌟 {watchedUserRating}</p>
							)}
						</div>

						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}
