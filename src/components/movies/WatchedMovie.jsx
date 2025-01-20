export default function WatchedMovie({ movie, onDeleteWatched, onSelectedMovie }) {
	const { imdbID, title, imdbRating, userRating, runtime, poster } = movie;

	return (
		<li>
			<img src={poster} onClick={() => onSelectedMovie(imdbID)} alt={`${title} poster`} />
			<h3 onClick={() => onSelectedMovie(imdbID)}>{title}</h3>

			<div>
				<p>
					<span>⭐️</span>
					<span>{imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{runtime} min</span>
				</p>

				<button className="btn-delete" onClick={() => onDeleteWatched(imdbID)}>
					❌
				</button>
			</div>
		</li>
	);
}
