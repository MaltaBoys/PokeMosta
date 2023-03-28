import { Navbar as Nav, DarkThemeToggle, Flowbite } from "flowbite-react";

export default function Navbar() {
	return (
		<>
			<Nav className="dark:bg-dark">
				<Nav.Brand to="/navbars">
					<img
						src="../static/images/logo.png"
						className="mr-3 h-10 sm:h-9"
						alt="PokeMosta"
					/>
				</Nav.Brand>
				<Nav.Toggle />
				<Nav.Collapse className="pr-0 text-lg text-red-600">
					<Nav.Link href="/navbars" active={true}>
						Home
					</Nav.Link>
					<Nav.Link href="#">Create my team</Nav.Link>
					<Nav.Link href="#">Pokedex</Nav.Link>
				</Nav.Collapse>
			
			</Nav>
		</>
	);
}
