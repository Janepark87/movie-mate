import EmptyStarSvg from './EmptyStarSvg';
import FilledStarSvg from './FilledStarSvg';

export default function Star({ onRate, isFilled, onHoverIn, onHoverOut, color, size }) {
	const starStyle = {
		display: 'inline-block',
		width: `${size}px`,
		height: `${size}px`,
		cursor: 'pointer',
	};

	return (
		<span style={starStyle} role="button" onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
			{isFilled ? <FilledStarSvg color={color} /> : <EmptyStarSvg color={color} />}
		</span>
	);
}
