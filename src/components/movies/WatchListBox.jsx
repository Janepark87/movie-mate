import { useState } from 'react';
import { tempWatchedData } from '../../assets/data/temp-watched-data';
import WatechedSummary from './WatechedSummary';
import WatchedMoviesList from './WatchedMoviesList';

export default function WatchListBox() {
	const [watched, setWatched] = useState(tempWatchedData);
	const [isOpen2, setIsOpen2] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
				{isOpen2 ? '-' : '+'}
			</button>

			{isOpen2 && (
				<>
					<WatechedSummary watched={watched} />
					<WatchedMoviesList watched={watched} />
				</>
			)}
		</div>
	);
}
