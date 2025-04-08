import Slider from "react-slick";
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const CardsSlider = () => {
  const { cardDestinationsFromFb } = useSelector(state => state.destinations);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Top 9 Travel Picks of 2025
      </h2>

      <Slider {...settings}>
        {cardDestinationsFromFb.map((item, index) => (
          <div key={index} className="px-2">
            <div className="relative group h-full">
              <Card className="rounded-2xl shadow-md flex flex-col h-full card-3d" style={{ minHeight: '350px' }}>
                <CardActionArea className="no-hover-effect">
                  <CardMedia
                    component="img"
                    image={item.image[0].url}
                    alt={item.image[0].alt}
                    className="h-56 object-cover"
                  />
                  <CardContent className="flex-grow flex flex-col justify-between items-start">
                    <Typography gutterBottom variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <div className="flex flex-wrap gap-2 mt-1 mb-2">
                      {item.highlights?.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <Typography variant="body2" className="text-start line-clamp-3" sx={{ color: 'text.secondary' }}>
                      {item.details}
                    </Typography>
                    <div className="flex items-center gap-2 text-xs text-green-700 font-medium mt-3">
                      <span className="text-lg">🕒</span>
                      <span>Best Time: {item.bestTimeToVisit}</span>
                    </div>
                  </CardContent>
                </CardActionArea>

                {/* Hover Overlay with Button */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white text-black px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition-transform transform group-hover:scale-105">
                    Get Itinerary
                  </button>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardsSlider;
