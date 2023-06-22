import "./Slider.css";
import React from "react";
import { Carousel } from "react-bootstrap";

function Slider(): JSX.Element {
  return (
    <Carousel>
      <Carousel.Item interval={10000}>
        <img
          src="https://s3-eu-central-1.amazonaws.com/www.burgerking.cl/wp-media-folder-bk-chile//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/13/banner-novedad_selection_1280x513_2.jpeg"
          alt="slide-1"
          className="d-block w-100"
        />
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          src="https://s3.amazonaws.com/prod-wp-tunota/wp-content/uploads/2022/01/principal_bkonline.jpg"
          alt="slide-2"
          className="d-block w-100"
        />
      </Carousel.Item>
      <Carousel.Item interval={10000}>
        <img
          src="https://pbs.twimg.com/media/D_EaXHqX4AAoK7v.jpg"
          alt="slide-3"
          className="d-block w-100"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;