import { Box, Typography, Paper, Avatar, useMediaQuery } from '@mui/material';

interface Review {
  name: string;
  text: string;
  destination: string;
  image: string;
}

// ✅ Static + complete data
const testimonials: Review[] = [
  {
    name: "Arjun Mehta",
    text: "The AI gave me a 5-day North East itinerary that felt handcrafted. I didn’t need to lift a finger!",
    destination: "Sikkim",
    image: "https://images.unsplash.com/photo-1632407575668-c956f851c3d7?q=80&w=1696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Rhea Kapoor",
    text: "It suggested offbeat places in Rajasthan I had never heard of — pure gold for explorers!",
    destination: "Jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kabir Singh",
    text: "The perfect mix of relaxation and adventure. I literally booked my entire trip in 30 minutes!",
    destination: "Goa",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
];

const Testimonials = () => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');

  return (
    <Box sx={{ px: { xs: 2, sm: 4, lg: 12 }, py: 6 }}>

      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Hear It from Real Travelers
      </Typography>

      {testimonials.map((t, idx) => (
        <Box
          key={t.name}
          display="flex"
          flexDirection={
            isSmallScreen
              ? 'column'
              : idx % 2 === 1
              ? 'row-reverse'
              : 'row'
          }
          alignItems="center"
          gap={4}
          mt={6}
        >
          {/* Image */}
          <Box flex={1}>
            <Avatar
              src={t.image}
              alt={t.name}
              variant="rounded"
              sx={{
                width: '100%',
                height: 280,
                borderRadius: 4,
                boxShadow: 3,
              }}
            />
          </Box>

          {/* Text */}
          <Paper
            elevation={6}
            sx={{
              flex: 1.2,
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography fontStyle={'italic'}>
              “{t.text}”
            </Typography>

            <Typography
              variant="subtitle2"
              align="right"
              fontWeight="medium"
              mt={2}
            >
              — {t.name}
            </Typography>

            <Typography
              variant="caption"
              align="right"
              display="block"
              color="text.secondary"
            >
              {t.destination}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default Testimonials;