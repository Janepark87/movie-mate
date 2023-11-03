import { useState } from 'react';
import { tempMovieData } from './assets/data/temp-movie-data';
import { tempWatchedData } from './assets/data/temp-watched-data';

import Navbar from './layouts/Navbar';
import Main from './layouts/Main';

import Search from './components/Search';
import NumResult from './components/navbar/NumResult';

import ListBox from './components/movies/ListBox';
import MoviesList from './components/movies/MoviesList';
import WatechedSummary from './components/movies/WatechedSummary';
import WatchedMoviesList from './components/movies/WatchedMoviesList';

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);
	const [watched, setWatched] = useState(tempWatchedData);

	return (
		<>
			<Navbar>
				<Search />
				<NumResult movies={movies} />
			</Navbar>

			<Main>
				<ListBox>
					<MoviesList movies={movies} />
				</ListBox>

				<ListBox>
					<WatechedSummary watched={watched} />
					<WatchedMoviesList watched={watched} />
				</ListBox>
			</Main>
		</>
	);
}
