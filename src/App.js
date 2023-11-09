import { useState, useEffect } from 'react';
import useMovies from './hooks/useMovies';
import useLocalStorageState from './hooks/useLocalStorageState';

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
	const [query, setQuery] = useState('venom');
	const [selectedId, setSelectedId] = useState(null);
	const { movies, isLoading, error } = useMovies(query);
	const [watched, setWatched] = useLocalStorageState([], 'watchedMovies');

	const handleAddWatched = (newMovie) => setWatched((watched) => [newMovie, ...watched]);

	const handleDeleteWatched = (deletedId) => setWatched((watched) => watched.filter((movie) => movie.imdbID !== deletedId));

	const handleSelectMovie = (id) => setSelectedId((selectedId) => (selectedId === id ? null : id));

	const handleCloseMovieDetails = () => setSelectedId(null);

	// close the watched list while searching
	useEffect(() => {
		setSelectedId(null);
	}, [movies]);

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
