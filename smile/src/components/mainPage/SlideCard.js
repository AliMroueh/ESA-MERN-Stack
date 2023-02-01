import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import './Categories.css'
function SlideCard() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="es">
        <img
          className="d-block "
          src="images/sale4.webp"
          alt="First slide"
        /></div>
         <Carousel.Caption>
          <h2  className="h2">50% Off For Your First Shopping</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="images/mohammad-metri-E-0ON3VGrBc-unsplash.jpg"
          alt="Second slide"
        />
          <Carousel.Caption>
          <h2 className="h2">50% Off For Your First Shopping</h2>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block"
          src="images/iphone.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h2  className="h2">50% Off For Your First Shopping</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default SlideCard