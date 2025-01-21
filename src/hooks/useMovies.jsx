import { useState, useEffect } from 'react';

export default function useMovies(query, callback) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const controller = new AbortController();
		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				setError('');

				const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_MOVIE_API}&s=${query}`, {
					signal: controller.signal,
				});

				if (!res.ok) throw new Error('Something went wrong with fetching movies');

				const data = await res.json();

				if (data.Response === 'False') throw new Error('Movies not found');

				setMovies(data.Search);
				setError('');
			} catch (err) {
				if (err.name !== 'AbortError') {
					console.log(err.message);
					setError(err.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (!query.length) {
			setMovies([]);
			setError('Search movies...');
			return;
		}

		fetchMovies();

		return () => {
			controller.abort();
		};
	}, [query]);

	// close movie detail while searching
	useEffect(() => {
		callback(null);
	}, [movies, callback]);

	return { movies, isLoading, error };
}
