import { useState } from 'react';
import Search from '../components/Search';
import Logo from '../components/navbar/Logo';
import NumResult from '../components/navbar/NumResult';

export default function Navbar() {
	const [query, setQuery] = useState('');

	return (
		<nav className="nav-bar">
			<Logo />
			<Search query={query} onChange={setQuery} />
			<NumResult />
		</nav>
	);
}
