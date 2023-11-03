import { useState } from 'react';
import { tempMovieData } from './assets/data/temp-movie-data';
import Navbar from './layouts/Navbar';
import Main from './layouts/Main';

import Search from './components/Search';
import NumResult from './components/navbar/NumResult';

import MoveListBox from './components/movies/MoveListBox';
import WatchListBox from './components/movies/WatchListBox';
import MovieList from './components/movies/MovieList';

export default function App() {
	const [movies, setMovies] = useState(tempMovieData);

	return (
		<>
			<Navbar>
				<Search />
				<NumResult movies={movies} />
			</Navbar>

			<Main>
				<MoveListBox>
					<MovieList movies={movies} />
				</MoveListBox>

				<WatchListBox />
			</Main>
		</>
	);
}
