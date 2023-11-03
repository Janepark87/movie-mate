import Logo from '../components/navbar/Logo';

export default function Navbar({ children }) {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
}
