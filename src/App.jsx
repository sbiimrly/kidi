import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import profileIcon from "./assets/profile.png";
import ProductShowCase from "./pages/home/ProductShowCase";
import Testimonial from "./pages/home/Testimoni";
import End from "./pages/home/lastSection";
import Footer from "./pages/home/Footer";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Information from "./pages/home/Information";
import Hero from "./pages/home/Hero";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./pages/auth/ProtectedRouter";

const Navbar = ({ scrollToSection }) => (
	<nav className="bg-color_nuetral_100_light z-50 flex items-center justify-between px-6 py-3 rounded-2xl fixed left-6 right-6 mt-6 md:left-14 md:right-14 lg:left-20 lg:right-20">
		<h1 className="text-2xl font-semibold text-color_primary_500_light">
			Kedai Manang
		</h1>

		<div className="hidden lg:flex items-center font-normal text-color_nuetral_400_light gap-10 text-base mx-auto">
			{[
				{ label: "Lokasi", id: "location" },
				{ label: "Menu", id: "menu" },
				{
					label: "Testimoni",
					id: "testimonials",
				},
				{ label: "Kontak", id: "contact" },
			].map((item, index) => (
				<button
					key={index}
					onClick={() => scrollToSection(item.id)}
					className="hover:text-color_primary_500_light transition duration-200 hover:scale-105">
					{item.label}
				</button>
			))}
		</div>

		<div className="sm:relative sm:top-auto sm:transform-none">
			<img
				src={profileIcon || "/placeholder.svg"}
				alt="Profile Icon"
				className="w-6 h-6 text-gray-100 hover:bg-blue-300 rounded-full cursor-pointer"
				onClick={() =>
					(window.location.href = "/signup")
				}
			/>
		</div>
	</nav>
);

const HomePage = () => {
	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="min-h-screen bg-color_background_light overflow-x-hidden px-6 md:px-14 lg:px-20">
			<Navbar scrollToSection={scrollToSection} />

			<div id="location">
				<Information />
			</div>

			<div className="mt-6 lg:mt-12">
				<Hero />
			</div>

			<div id="menu" className="mt-6 lg:mt-12">
				<ProductShowCase />
			</div>

			<div id="testimonials" className="mt-6 lg:mt-12">
				<Testimonial />
			</div>

			<div className="mt-6 lg:mt-12">
				<End />
			</div>

			<div id="contact" className="mt-6 lg:mt-12">
				<div className="-mx-6 md:-mx-12 lg:-mx-20">
					<Footer />
				</div>
			</div>
		</div>
	);
};

function App() {
	return (
		<Router>
			<Routes>
				{/* Halaman Utama */}
				<Route path="/" element={<HomePage />} />

				{/* Halaman Login */}
				<Route
					path="/login"
					element={<LoginPage />}
				/>

				{/* Halaman Signup */}
				<Route
					path="/signup"
					element={<SignupPage />}
				/>
				<Route
					path="/admin/dashboard"
					element={
						<ProtectedRoute role="admin">
							<Dashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
