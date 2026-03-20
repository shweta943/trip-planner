import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Itineraries",
    desc: "Get a complete day-wise travel plan tailored for you.",
  },
  {
    title: "Smart Budget Planning",
    desc: "Trips designed to match your budget perfectly.",
  },
  {
    title: "Vibe-Based Travel",
    desc: "Choose your mood and get curated destinations.",
  },
  {
    title: "Instant Trip Generation",
    desc: "No more research. Get your plan instantly.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const floating = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Features = () => {
  return (
    <Box className="py-24 px-6 bg-gradient-to-b from-white to-gray-100 text-center">
      <Typography variant="h4" fontWeight="bold">
        Why Choose Us
      </Typography>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-10 mt-16 max-w-5xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            animate="animate"
            className="relative"
          >
            {/* Floating wrapper */}
            <motion.div
              variants={floating}
              animate="animate"
              className="p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30"
            >
              {/* Card */}
              <Box className="bg-white p-8 rounded-2xl shadow-lg">
                <Typography variant="h6" fontWeight="bold">
                  {feature.title}
                </Typography>

                <Typography variant="body2" mt={2} color="text.secondary">
                  {feature.desc}
                </Typography>
              </Box>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default Features;
