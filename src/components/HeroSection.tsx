import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

type SnackbarSeverity = "success" | "error" | "info" | "warning";

interface HeroSectionProps {
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
}

const HeroSection = ({ showSnackbar }: HeroSectionProps) => {
  const { userDetails } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/generate-trip");
  };

  return (
    <div className="relative w-full min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-black">
      {/* 🌌 Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -120, 120, 0], y: [0, 60, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* 🌟 Content */}
      <div className="relative z-10 px-6 max-w-4xl">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600"
        >
          Every Corner of India Has a Story
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-gray-300"
        >
          <i>
            AI-crafted itineraries tailored to your vibe, budget, and travel style.
          </i>
        </motion.p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 px-10 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg hover:shadow-orange-500/40 transition duration-300"
          onClick={handleButtonClick}
        >
          Plan My Journey ✨
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
