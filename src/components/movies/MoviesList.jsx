import Movie from './Movie';

export default function MoviesList({ movies }) {
	return (
		<ul className="list">
			{movies?.map((movie) => (
				<Movie key={movie.imdbID} movie={movie} />
			))}
		</ul>
	);
}
