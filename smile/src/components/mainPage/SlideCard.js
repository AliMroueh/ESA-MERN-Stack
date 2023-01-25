import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import './Categories.css'
function SlideCard() {
  return (
    <Carousel>
      <Carousel.Item>
        <div>
        <img
          className="d-block "
          src="images/mohammad-metri-E-0ON3VGrBc-unsplash.jpg"
          alt="First slide"
        /></div>
         <Carousel.Caption>
          <h2  className="h2">50% Off For Your First Shopping</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="images/giorgio-trovato-8krX0HkXw8c-unsplash.jpg"
          alt="Second slide"
        />
          <Carousel.Caption>
          <h2 className="h2">50% Off For Your First Shopping</h2>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="images/ehimetalor-akhere-unuabona-lq19sZ5pQ-c-unsplash.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h2  className="h2">50% Off For Your First Shopping</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideCard;