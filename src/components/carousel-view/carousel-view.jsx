import React, { useState } from "react";
import { Carousel, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "../../index.scss";

const ControlledCarousel = ({ movies }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Col className="d-flex justify-content-center mb-5">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        slide={false}
        interval={null}
        className="carousel-c"
      >
        {movies.map((movie, idx) => (
          <Carousel.Item key={movie._id} active={idx === index}>
            <MovieCard movie={movie} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
  );
};

export default ControlledCarousel;
