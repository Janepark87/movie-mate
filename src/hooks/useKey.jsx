import { useEffect } from 'react';

export default function useKey(keyboardKey, action) {
	useEffect(() => {
		const callback = (e) => {
			if (e.code.toLowerCase() === keyboardKey.toLowerCase()) action();
		};

		document.addEventListener('keydown', callback);

		return () => document.removeEventListener('keydown', callback);
	}, [keyboardKey, action]);
}
