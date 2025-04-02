import Slider from "react-slick";
// import IndividualCard from "./IndividualCard";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const CardsSlider = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  const data = [
    { title: "Lizard", description: "Lizards are a widespread group..." },
    { title: "Lizard2", description: "description 2" },
    { title: "Lizard3", description: "description 3" },
    { title: "Lizard4", description: "description 4" }
  ];
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data.map((item, index) => (
          <Card key={index}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Slider>
    </div>
  );
}

export default CardsSlider;
