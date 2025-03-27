import Slider from "react-slick";
import IndividualCard from "./IndividualCard";

const CardsSlider = () => {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    className: "flex"
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <IndividualCard />
      </Slider>
    </div>
  );
}

export default CardsSlider;
