import Slider from "react-slick";
import image1 from "../assets/image/image1.jpeg";
import image2 from "../assets/image/image2.jpg";
import image3 from "../assets/image/image3.jpg";
import image4 from "../assets/image/image4.jpg";
export const SliderComponent = () => {
    let images = [image1, image2, image3, image4];
  
    var settings = {
        arrows: false,
        dots: false,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="h-[400px] w-[500px]">
              <img src={image} alt="anh giay" />
            </div>
          ))}
        </Slider>
      );
}
