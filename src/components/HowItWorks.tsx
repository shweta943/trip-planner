import { Box, Typography } from "@mui/material";

const steps = [
  {
    title: "Tell Us Your Travel Style",
    desc: "Choose destination, budget, and vibe that matches your trip.",
  },
  {
    title: "AI Crafts Your Plan",
    desc: "Our backend generates a personalized itinerary using smart prompts.",
  },
  {
    title: "Get Your Itinerary",
    desc: "Receive a structured, ready-to-use travel plan instantly.",
  },
];

const HowItWorks = () => {
  return (
    <Box className="py-16 px-6 bg-gradient-to-b from-white to-gray-50 text-center">

      <Typography variant="h4" fontWeight="bold">
        How It Works
      </Typography>

      <Box className="grid md:grid-cols-3 gap-8 mt-12">

        {steps.map((step, index) => (
          <Box
            key={index}
            className="relative p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <Typography
              className="absolute -top-5 left-6 text-5xl font-bold text-blue-400"
            >
              {`0${index + 1}`}
            </Typography>

            <Typography variant="h6" fontWeight="bold" mt={3}>
              {step.title}
            </Typography>

            <Typography variant="body2" mt={2} color="text.secondary">
              {step.desc}
            </Typography>
          </Box>
        ))}

      </Box>
    </Box>
  );
};

export default HowItWorks;