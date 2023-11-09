import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import useKey from '../hooks/useKey';

export default function Search({ onSearch }) {
	const [search, setSearch] = useState('');
	const searchInput = useRef(null);

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		if (search.trim().length > 0) {
			onSearch(search.trim());
			setSearch('');
		}
	};

	useKey('enter', () => {
		if (document.activeElement === searchInput.current) return;
		searchInput.current.focus();
	});

	useEffect(() => {
		const searchFocusedAfterEnter = (e) => {
			if (document.activeElement === searchInput.current) return;
			searchInput.current.focus();
		};

		document.addEventListener('keydown', searchFocusedAfterEnter);
		searchInput.current.focus();

		return () => document.addEventListener('keydown', searchFocusedAfterEnter);
	}, []);

	return (
		<form onSubmit={handleSearchSubmit}>
			<input ref={searchInput} className="search" type="text" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)} />
		</form>
	);
}
