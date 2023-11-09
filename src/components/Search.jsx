import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export default function Search({ onSearch }) {
	const [search, setSearch] = useState('');
	const searchInput = useRef(null);

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		if (search.length > 0) onSearch(search);
		setSearch('');
	};

	useEffect(() => {
		const searchFocusedAfterEnter = (e) => {
			if (document.activeElement === searchInput.current) return;
			if (e.code === 'Enter') searchInput.current.focus();
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
