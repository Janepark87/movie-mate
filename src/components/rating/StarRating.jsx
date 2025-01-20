import { useState } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

StarRating.propTypes = {
	maxRating: PropTypes.number,
	defaultRating: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number,
	messages: PropTypes.array,
	className: PropTypes.string,
	onSetRating: PropTypes.func,
};
export default function StarRating({ maxRating = 5, color = '#fcc419', size = 32, className = '', messages = [], defaultRating = 0, onSetRating }) {
	const [rating, setRating] = useState(defaultRating);
	const [tempHoverRating, setTempHoverRating] = useState(0);

	const handleRating = (currentRating) => {
		setRating(currentRating);
		if (onSetRating) onSetRating(currentRating);
	};

	const textStyle = {
		lineHeight: '1',
		margin: '0',
		color,
		fontSize: `${size / 1.5}px`,
	};

	return (
		<div className={`rating-container ${className}`}>
			<div className="rating-inner">
				{Array.from({ length: maxRating }, (_, index) => (
					<Star
						key={index}
						color={color}
						size={size}
						onRate={() => handleRating(index + 1)} //
						onHoverIn={() => setTempHoverRating(index + 1)}
						onHoverOut={() => setTempHoverRating(0)}
						isFilled={tempHoverRating ? tempHoverRating >= index + 1 : rating >= index + 1}
					/>
				))}
			</div>
			<p style={textStyle}>
				{messages.length === maxRating //
					? messages[tempHoverRating ? tempHoverRating - 1 : rating - 1]
					: tempHoverRating || rating || ''}
			</p>
		</div>
	);
}
