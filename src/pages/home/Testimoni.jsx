import React, {
	useState,
	useEffect,
	useRef,
} from "react";
import {
	motion,
	useAnimation,
} from "framer-motion"; // Import Framer Motion
import { Star } from "lucide-react";
import {
	getTestimoniList,
	addTestimoniWithLimit,
} from "../../utils/storeUtils";

const TestimonialsCarousel = ({
	testimonials,
}) => {
	const controls = useAnimation();
	const carouselRef = useRef(null);

	const handleDragEnd = () => {
		controls.start({
			x: ["0%", "-100%"],
			transition: {
				repeat: Infinity,
				duration: 100,
				ease: "linear",
			},
		});
	};

	return (
		<div className="overflow-hidden w-full grid-rows-2 gap-4">
			<motion.div
				className="flex gap-5 cursor-grab active:cursor-grabbing"
				style={{ minWidth: "max-content" }}
				animate={controls}
				transition={{
					repeat: Infinity,
					duration: 100,
					ease: "linear",
				}}
				drag="x"
				dragConstraints={{
					left: -2000,
					right: 0,
				}}
				dragElastic={0.1}
				onDragStart={() => controls.stop()}
				onDragEnd={handleDragEnd}
				ref={carouselRef}>
				{testimonials
					.concat(testimonials)
					.map((testimonial, index) => (
						<div
							key={index}
							className="bg-color_nuetral_100_light p-6 rounded-lg w-80 flex-shrink-0">
							<h3 className="font-semibold mb-2">
								{testimonial.name}
							</h3>
							<p className="text-gray-600 mb-4">
								{testimonial.pesan}
							</p>
							<StarRating
								rating={testimonial.rating}
							/>
						</div>
					))}
			</motion.div>
		</div>
	);
};

const Testimonial = () => {
	const [testimonials, setTestimonials] =
		useState([]);
	const [showForm, setShowForm] = useState(false);
	const [newTestimonial, setNewTestimonial] =
		useState({
			name: "",
			text: "",
			rating: 0,
		});

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const testimoniData =
					await getTestimoniList();
				setTestimonials(testimoniData);
			} catch (error) {
				console.error(
					"Error fetching testimonials:",
					error
				);
			}
		};
		fetchTestimonials();
	}, []);

	const handleStarClick = (rating) => {
		setNewTestimonial({
			...newTestimonial,
			rating,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewTestimonial({
			...newTestimonial,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			newTestimonial.name &&
			newTestimonial.text &&
			newTestimonial.rating > 0
		) {
			try {
				await addTestimoniWithLimit(
					newTestimonial.name,
					"",
					newTestimonial.rating,
					newTestimonial.text
				);
				const updatedTestimonials =
					await getTestimoniList();
				setTestimonials(updatedTestimonials);
				setNewTestimonial({
					name: "",
					text: "",
					rating: 0,
				});
				setShowForm(false);
			} catch (error) {
				console.error(
					"Error submitting testimonial:",
					error
				);
			}
		}
	};

	return (
		<div className="flex flex-col gap-5 md:gap-7">
			<div className="text-center flex flex-col gap-4">
				<p className="text-sm font-regular text-gray-600 md:text-base">
					Testimoni
				</p>
				<h2 className="text-2xl font-semibold md:text-4xl md:leading-normal">
					Cerita mereka{" "}
					<span className="text-blue-500">
						bermula
					</span>{" "}
					ketika <br /> mencoba jajanan kami 🥰
				</h2>
				<p className="text-gray-600 font-regular text-lg md:text-xl">
					Ayo berikan testimoni Anda
				</p>
			</div>

			<TestimonialsCarousel
				testimonials={testimonials}
			/>

			<button
				onClick={() => setShowForm(!showForm)}
				className="bg-color_primary_500_light text-color_nuetral_100_light rounded-lg py-3 justify-center flex font-semibold hover:bg-color_primary_300_light transition-colors">
				Berikan testimoni
				<span className="ml-2 items-center">
					<svg
						width="21"
						height="21"
						viewBox="0 0 20 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="inline-block align-middle">
						<path
							d="M12.4531 16.1833C12.2948 16.1833 12.1364 16.125 12.0114 16C11.7698 15.7583 11.7698 15.3583 12.0114 15.1166L16.6281 10.5L12.0114 5.88331C11.7698 5.64164 11.7698 5.24164 12.0114 4.99998C12.2531 4.75831 12.6531 4.75831 12.8948 4.99998L17.9531 10.0583C18.1948 10.3 18.1948 10.7 17.9531 10.9416L12.8948 16C12.7698 16.125 12.6114 16.1833 12.4531 16.1833Z"
							fill="#FFFFFF"
						/>
						<path
							d="M17.3698 11.125H3.34476C3.0031 11.125 2.71976 10.8417 2.71976 10.5C2.71976 10.1583 3.0031 9.875 3.34476 9.875H17.3698C17.7114 9.875 17.9948 10.1583 17.9948 10.5C17.9948 10.8417 17.7114 11.125 17.3698 11.125Z"
							fill="#FFFFFF"
						/>
					</svg>
				</span>
			</button>

			{showForm && (
				<div className="mt-6 p-6 bg-white rounded-lg">
					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-1">
								Nama
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={newTestimonial.name}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label
								htmlFor="text"
								className="block text-sm font-medium text-gray-700 mb-1">
								Testimoni
							</label>
							<textarea
								id="text"
								name="text"
								value={newTestimonial.text}
								onChange={handleInputChange}
								rows={4}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required></textarea>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Rating
							</label>
							<StarRating
								rating={newTestimonial.rating}
								onStarClick={handleStarClick}
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
							Kirim Testimoni →
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

const StarRating = ({ rating, onStarClick }) => (
	<div className="flex gap-1">
		{[1, 2, 3, 4, 5].map((star) => (
			<button
				key={star}
				onClick={() =>
					onStarClick && onStarClick(star)
				}
				className="focus:outline-none">
				<Star
					className={`w-5 h-5 ${
						star <= rating
							? "fill-blue-500 text-blue-500"
							: "text-gray-300"
					}`}
				/>
			</button>
		))}
	</div>
);

export default Testimonial;
