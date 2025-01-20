import WatchedMovie from './WatchedMovie';

export default function WatchedMoviesList({ watched, onDeleteWatched, onSelectedMovie }) {
	return (
		<ul className="list list-watched">
			{watched.map((movie) => (
				<WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} onSelectedMovie={onSelectedMovie} />
			))}
		</ul>
	);
}
