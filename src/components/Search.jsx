import { useState, useEffect, useRef } from 'react';
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

	const focusedSearchInput = () => {
		if (document.activeElement === searchInput.current) return;
		searchInput.current.focus();
	};

	useKey('enter', focusedSearchInput);

	useEffect(() => {
		document.addEventListener('keydown', focusedSearchInput);
		searchInput.current.focus();

		return () => document.removeEventListener('keydown', focusedSearchInput);
	}, []);

	return (
		<form onSubmit={handleSearchSubmit}>
			<input ref={searchInput} className="search" type="text" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)} />
		</form>
	);
}
