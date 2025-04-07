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
    autoplay: false,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-10 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Top 9 Travel Picks of 2025
      </h2>

      <Slider {...settings}>
        {cardDestinationsFromFb.map((item, index) => (
          <div key={index} className="px-2">
            <Card className="rounded-2xl shadow-md h-full">
              <CardActionArea>
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
                  <Typography variant="body2" className="text-start" sx={{ color: 'text.secondary' }}>
                    {item.details}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardsSlider;