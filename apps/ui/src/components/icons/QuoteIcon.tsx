type Props = {
	size?: number;
};
export const QuoteIcon = ({ size = 24 }: Props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
		>
			<title>Quote</title>
			<path
				fill="oklch(0.646 0.222 41.116)"
				d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3z"
			/>
		</svg>
	);
};
