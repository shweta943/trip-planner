import { Box, Typography, Paper, Avatar, useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import getUnspashImages from '../config/Unsplash/getUnsplashImage';

const testimonials = [
  {
    name: "Arjun Mehta",
    text: "The AI gave me a 5-day North East itinerary that felt handcrafted. I didn’t need to lift a finger!",
    destination: "Sikkim",
  },
  {
    name: "Rhea Kapoor",
    text: "It suggested offbeat places in Rajasthan I had never heard of — pure gold for explorers!",
    destination: "Jaipur",
  },
  {
    name: "Kabir Singh",
    text: "The perfect mix of relaxation and adventure. I literally booked my entire trip in 30 minutes!",
    destination: "Goa",
  },
];

const Testimonials = () => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getDestinationImages = async () => {
      const newArray = await Promise.all(
        testimonials.map(async (r) => {
          const image = await getUnspashImages(r.destination);
          return {
            ...r,
            image: image[0]?.urls?.regular,
          };
        })
      );
      setReviews(newArray);
    };

    getDestinationImages();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, lg: 12 }, py: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Hear It from Real Travelers
      </Typography>

      {reviews.map((t, idx) => (
        <Box
          key={idx}
          display="flex"
          flexDirection={isSmallScreen ? 'column' : idx % 2 === 1 ? 'row-reverse' : 'row'}
          alignItems="center"
          gap={4}
          mt={6}
        >
          {/* Left Image */}
          <Box flex={1}>
            <Avatar
              src={t.image}
              alt={t.name}
              variant="rounded"
              sx={{ width: '100%', height: 280, borderRadius: 4, boxShadow: 3 }}
            />
          </Box>

          {/* Right Text Box */}
          <Paper
            elevation={24}
            sx={{
              flex: 1.2,
              p: 3,
              bgcolor: 'background.paper',
              borderRadius: 4,
              boxShadow: 3,
            }}
          >
            <p style={{ fontStyle: 'italic' }}>
              “{t.text}”
            </p>
            <Typography
              variant="subtitle2"
              color="text.primary"
              align="right"
              fontWeight="medium"
              mt={2}
            >
              — {t.name}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default Testimonials;