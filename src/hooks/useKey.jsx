import { useEffect } from 'react';

export default function useKey(keyboardKey, action) {
	useEffect(() => {
		const escapedMovie = (e) => {
			if (e.code.toLowerCase() === keyboardKey.toLowerCase()) action();
		};

		document.addEventListener('keydown', escapedMovie);

		return () => document.removeEventListener('keydown', escapedMovie);
	}, [keyboardKey, action]);
}
