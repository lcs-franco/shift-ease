import type { ReactElement } from "react";

type Props = {
	icon?: ReactElement<SVGAElement>;
	title: string;
	description: string;
};

export const FeatureCard = ({ icon, title, description }: Props) => {
	return (
		<div className="bg-zinc-900 p-8 border-1  border-zinc-700 flex flex-col text-start rounded-md min-h-40 self-start gap-3 w-full h-full md:w-auto">
			<div>{icon}</div>
			<h1 className="font-bold text-orange-600 text-xl">{title}</h1>
			<p>{description}</p>
		</div>
	);
};
