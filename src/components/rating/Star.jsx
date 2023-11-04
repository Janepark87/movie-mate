import EmptyStarSvg from './EmptyStarSvg';
import FilledStarSvg from './FilledStarSvg';

export default function Star({ onRate, filledStar, onHoverIn, onHoverOut }) {
	return (
		<span className="star" role="button" onClick={onRate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
			{filledStar ? <FilledStarSvg /> : <EmptyStarSvg />}
		</span>
	);
}
