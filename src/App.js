import { useState, useEffect } from 'react';

import Navbar from './layouts/Navbar';
import Main from './layouts/Main';

import Search from './components/Search';
import NumResult from './components/navbar/NumResult';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

import ListBox from './components/movies/ListBox';
import MoviesList from './components/movies/MoviesList';
import MovieDetails from './components/movies/MovieDetails';
import WatechedSummary from './components/movies/WatechedSummary';
import WatchedMoviesList from './components/movies/WatchedMoviesList';

export default function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [query, setQuery] = useState('venom');
	const [selectedId, setSelectedId] = useState(null);
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState(() => {
		const storedValue = JSON.parse(localStorage.getItem('watchedMovies'));
		return storedValue ? storedValue : [];
	});

	const handleSelectMovie = (id) => {
		setSelectedId((selectedId) => (selectedId === id ? null : id));
	};

	const handleCloseMovieDetails = () => {
		setSelectedId(null);
	};

	const handleAddWatched = (newMovie) => {
		setWatched((watched) => [newMovie, ...watched]);
	};

	const handleDeleteWatched = (deletedId) => {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== deletedId));
		localStorage.removeItem('watchedMovies');
	};

	useEffect(() => {
		localStorage.setItem('watchedMovies', JSON.stringify(watched));
	}, [watched]);

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

		handleCloseMovieDetails();
		fetchMovies();

		return () => {
			controller.abort();
		};
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
					{!isLoading && !error && <MoviesList movies={movies} onSelectedMovie={handleSelectMovie} />}
					{error && <ErrorMessage message={error} />}
				</ListBox>

				<ListBox>
					{selectedId ? (
						<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovieDetails} onAddWatched={handleAddWatched} watched={watched} />
					) : (
						<>
							<WatechedSummary watched={watched} />
							<WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
						</>
					)}
				</ListBox>
			</Main>
		</>
	);
}
