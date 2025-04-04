import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ReadyToStartSection } from "@/components/ReadyToStartSection";
import { TestimonialSection } from "@/components/TestimonialSection";

export const LandingPage = () => {
	return (
		<>
			<HeroSection />
			<FeatureSection />
			<TestimonialSection />
			<ReadyToStartSection />
			<Footer />
		</>
	);
};
