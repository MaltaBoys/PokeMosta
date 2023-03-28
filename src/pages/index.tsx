import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import { Alert, Navbar, Button, Card, DarkThemeToggle } from "flowbite-react";

export default function Home() {
	return (
		<>
			<Navbar fluid={true} rounded={true}>
				<Navbar.Brand to="/navbars">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="mr-3 h-6 sm:h-9"
						alt="Flowbite Logo"
					/>
					<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
						Flowbite
					</span>
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Navbar.Link href="/navbars" active={true}>
						Home
					</Navbar.Link>
					<Navbar.Link>About</Navbar.Link>
					<Navbar.Link href="/navbars">Services</Navbar.Link>
					<Navbar.Link href="/navbars">Pricing</Navbar.Link>
					<Navbar.Link href="/navbars">Contact</Navbar.Link>
				</Navbar.Collapse>
			</Navbar>
			<Card href="#">
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Noteworthy technology acquisitions 2021123123123213
				</h5>
				<p className="font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of 2021 so
					far, in reverse chronological order.
				</p>
				<Button outline={true} gradientDuoTone="cyanToBlue">
					Cyan to Blue
				</Button>
			</Card>
			<DarkThemeToggle></DarkThemeToggle>
		</>
	);
}
