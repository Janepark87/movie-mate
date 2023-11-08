import { useState } from 'react';

export default function Search({ onSearch }) {
	const [search, setSearch] = useState('');

	const handleSearchSubmit = (e) => {
		e.preventDefault();

		onSearch(search);
		setSearch('');
	};

	return (
		<form onSubmit={handleSearchSubmit}>
			<input className="search" type="text" placeholder="Search movies..." value={search} onChange={(e) => setSearch(e.target.value)} />
		</form>
	);
}
