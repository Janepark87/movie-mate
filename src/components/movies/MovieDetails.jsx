import { useState } from 'react';
import { useEffect } from 'react';
import StarRating from '../rating/StarRating';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';

export default function MovieDetails({ selectedId, onCloseMovie }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [movie, setMovie] = useState({});
	const {
		Title: title,
		Poster: poster,
		Runtime: runtime,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
		imdbRating,
	} = movie;

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
							<StarRating maxRating={10} size={22} />
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
