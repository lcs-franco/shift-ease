import { motion } from "motion/react";
import { TestimonialCard } from "./TestimonialCard";
import { QuoteIcon } from "./icons/QuoteIcon";

const testimonials = [
	{
		testimonial:
			"ShiftEase has transformed how we manage our hospital staff scheduling. It's intuitive and saves us hours every week.",
		author: "Dr. Sarah Johnson",
		occupation: "Hospital Administrator",
	},
	{
		testimonial:
			"The ability to quickly swap shifts and get manager approval has been a game-changer for our retail team.",
		author: "Michael Chen",
		occupation: "Store Manager",
	},
	{
		testimonial:
			"We've reduced scheduling errors by 85% since implementing ShiftEase across our restaurant chain.",
		author: "Priya Patel",
		occupation: "Operations Director",
	},
];

export const TestimonialSection = () => {
	return (
		<div className="flex flex-col bg-zinc-900 items-center justify-center gap-5 px-4 md:px-40 py-5 md:py-10">
			<motion.h2
				className="font-bold text-xl md:text-2xl"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				Trusted by teams everywhere
			</motion.h2>
			<motion.div
				className="grid grid-cols-1 md:grid-cols-3 gap-3"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				{testimonials.map((testimonial) => (
					<TestimonialCard
						key={testimonial.testimonial}
						icon={<QuoteIcon size={window.innerWidth > 100 ? 46 : 36} />}
						testimonial={testimonial.testimonial}
						author={testimonial.author}
						occupation={testimonial.occupation}
					/>
				))}
			</motion.div>
		</div>
	);
};
