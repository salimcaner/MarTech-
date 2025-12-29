import BackgroundFlow from '../components/landing/BackgroundFlow';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import Metrics from '../components/landing/Metrics';
import Features from '../components/landing/Features';
import StrategicCTA from '../components/landing/StrategicCTA';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

const Landing = () => {
    return (
        <div className="relative min-h-screen bg-base overflow-hidden">
            {/* Background Animation */}
            <BackgroundFlow />

            {/* Main Content */}
            <div className="relative z-10">
                <Header />
                <Hero />
                <Metrics />
                <Features />
                <StrategicCTA />
                <Testimonials />
                <Pricing />
                <FAQ />
                <Footer />
            </div>
        </div>
    );
};

export default Landing;
