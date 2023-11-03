export default function Search({ query, onChange }) {
	return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => onChange(e.target.value)} />;
}
