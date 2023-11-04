import { useState } from 'react';
import Star from './Star';

export default function StarRating({ maxRating = 5 }) {
	const [rating, setRating] = useState(0);
	const [tempHoverRating, setTempHoverRating] = useState(0);

	return (
		<div className="rating-container">
			<div className="rating-inner">
				{Array.from({ length: maxRating }, (_, index) => (
					<Star
						key={index}
						onRate={() => setRating(index + 1)} //
						onHoverIn={() => setTempHoverRating(index + 1)}
						onHoverOut={() => setTempHoverRating(0)}
						filledStar={tempHoverRating ? tempHoverRating >= index + 1 : rating >= index + 1}
					/>
				))}
			</div>
			<p className="rating-text">{tempHoverRating || rating || ''}</p>
		</div>
	);
}
