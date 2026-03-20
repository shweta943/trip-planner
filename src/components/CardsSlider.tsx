import Slider from "react-slick";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../config/backendAPI/apiClient";
import { styled } from "@mui/material/styles";

type SnackbarSeverity = "success" | "error" | "info" | "warning";

interface CardsSliderProps {
  showSnackbar: (message: string, severity: SnackbarSeverity) => void;
}

const CardsSlider = ({ showSnackbar }: CardsSliderProps) => {
  const { userDetails } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  // ✅ Cleaner handler
  const handleButtonClick = () => {
    if (!userDetails) {
      showSnackbar("Please login to continue generating itinerary!", "info");
      return;
    }

    navigate("/generate-trip");
  };

  const settings: import("react-slick").Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, centerMode: false },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerMode: false },
      },
    ],
  };

  const StyledSlider = styled(Slider)(() => ({
    ".slick-slide": {
      transition: "transform 0.4s ease, opacity 0.4s ease",
    },

    ".slick-slide > div": {
      transform: "scale(0.9)",
      opacity: 0.6,
    },

    ".slick-center > div": {
      transform: "scale(1)",
      opacity: 1,
    },

    ".slick-center .MuiCard-root": {
      boxShadow: "0px 20px 40px rgba(0,0,0,0.25)",
    },
  }));
  const {
    data: cardsDest = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["top-destinations"],
    queryFn: async () => {
      const response = await apiClient("/api/fs/top-destinations");
      return response;
    },
  });

  if (isLoading) {
    return <Box className="p-6 text-center">Loading destinations...</Box>;
  }

  if (error) {
    return <Box className="p-6 text-center">Failed to load destinations</Box>;
  }

  return (
    <Box className="w-full px-4 sm:px-8 lg:px-16 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Top Travel Picks of 2026
      </h2>

      <StyledSlider {...settings}>
        {cardsDest.map((item: any) => (
          <Card
            key={item.id}
            className="rounded-3xl shadow-lg shadow-cyan-500/50 flex flex-col relative group py-2 px-3 m-3 cursor-pointer"
            style={{ minHeight: "350px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                className="h-56 object-cover"
              />
              <CardContent className="flex-grow flex flex-col justify-between items-start">
                <Typography gutterBottom variant="h6">
                  {item.title}
                </Typography>

                <div className="flex flex-wrap gap-2 mt-1 mb-2">
                  {item.highlights
                    ?.slice(0, 3)
                    .map((highlight: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                </div>

                <Typography
                  variant="body2"
                  className="text-start line-clamp-3"
                  sx={{ color: "text.secondary" }}
                >
                  {item.details}
                </Typography>

                <div className="flex items-center gap-2 text-xs text-green-700 font-medium mt-3">
                  <span className="text-lg">🕒</span>
                  <span>Best Time: {item.bestTimeToVisit}</span>
                </div>
              </CardContent>
            </CardActionArea>

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-white text-black px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition-transform transform group-hover:scale-105"
                style={{ backgroundColor: "#f9f9f9" }}
                onClick={handleButtonClick}
              >
                Get Itinerary
              </button>
            </div>
          </Card>
        ))}
      </StyledSlider>
    </Box>
  );
};

export default CardsSlider;
