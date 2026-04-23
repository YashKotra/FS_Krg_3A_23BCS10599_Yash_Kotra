import heroImg from "../../assets/HeroImg.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="homepage"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Text on top of the image */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white p-6 drop-shadow-lg">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Drive Your Journey
          </h1>
          <p className="text-lg tracking-tighter font-semibold  md:text-xl mt-12 mb-6">
            Affordable. Reliable. Anytime, Anywhere.
          </p>
          <Link
            to="/cars"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg inline-block"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
