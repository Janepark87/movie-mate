import { useState } from 'react';
import { tempMovieData } from './assets/data/temp-movie-data';
import { tempWatchedData } from './assets/data/temp-watched-data';

import Navbar from './layouts/Navbar';
import Main from './layouts/Main';

import Search from './components/Search';
import NumResult from './components/navbar/NumResult';
import Loader from './components/Loader';

import ListBox from './components/movies/ListBox';
import MoviesList from './components/movies/MoviesList';
import WatechedSummary from './components/movies/WatechedSummary';
import WatchedMoviesList from './components/movies/WatchedMoviesList';
import { useEffect } from 'react';
import ErrorMessage from './components/ErrorMessage';

export default function App() {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(tempWatchedData);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				setIsLoading(true);
				setError('');

				const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_MOVIE_API}&s=${query}`);

				if (!res.ok) throw new Error('Something went wrong with fetching movies');

				const data = await res.json();

				if (data.Response === 'False') throw new Error('Move not found');

				setMovies(data.Search);
			} catch (err) {
				console.log(err.message);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (!query.length) {
			setMovies([]);
			setError('Search your movies...');
			return;
		}

		fetchMovies();
	}, [query]);

	return (
		<>
			<Navbar>
				<Search onSearch={setQuery} />
				<NumResult movies={movies} />
			</Navbar>

			<Main>
				<ListBox>
					{isLoading && <Loader />}
					{!isLoading && !error && <MoviesList movies={movies} />}
					{error && <ErrorMessage message={error} />}
				</ListBox>

				<ListBox>
					<WatechedSummary watched={watched} />
					<WatchedMoviesList watched={watched} />
				</ListBox>
			</Main>
		</>
	);
}
