import type { ReactElement } from "react";

type Props = {
	icon: ReactElement<SVGAElement>;
	testimonial: string;
	author: string;
	occupation: string;
};

export const TestimonialCard = ({
	icon,
	testimonial,
	author,
	occupation,
}: Props) => {
	return (
		<div className="bg-zinc-900 p-8 border-1  border-zinc-700 flex flex-col text-start rounded-md min-h-60 self-start gap-3 w-full h-full md:w-auto">
			<div>{icon}</div>
			<p>{testimonial}</p>
			<p className="text-md font-bold text-orange-600">{author}</p>
			<p className="text-sm font-bold text-zinc-500">{occupation}</p>
		</div>
	);
};
