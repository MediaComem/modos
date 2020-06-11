import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

interface IProps {
  items: ISliderItemModos[];
  className?: string;
  id?: string;
  carouselClassName?: string;
  carouselCaptionClassName?: string;
}

export interface ISliderItemModos {
  imgSrc;
  imgAlt;
  caption;
  className?: string;
  id?: string;
}

export const SliderModosContainer = (props: IProps) => {
  const [ sliderActiveIndex, setSliderActiveIndex ] = useState(0);

  return (
    <div className={`${props.className}`} id={props.id}>
      <Carousel
        className={props.carouselClassName}
        interval={null}
        indicators={false}
        wrap={false}
        controls={false}
        activeIndex={sliderActiveIndex}
        onSelect={event => {
          setSliderActiveIndex(event);
        }}
      >
        {props.items.map((item, index) =>
          <Carousel.Item key={index}>
            <img
              className='d-block w-100'
              alt={item.imgAlt}
              src={item.imgSrc}
            />
            <Carousel.Caption className={props.carouselCaptionClassName}>
              <p>{item.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>)}
      </Carousel>

      <div className='custom-carousel-indicators'>
        {props.items.map((card, index) =>
          <a key={index} onClick={() => setSliderActiveIndex(index)}>
            <div
              className={`custom-carousel-indicator ${
                sliderActiveIndex === index ? 'active' : ''
              }`}
            ></div>
          </a>)}
      </div>

      <style jsx>{`
        .custom-carousel-indicators {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: row;
          margin-top: 10px;
          margin-bottom: 30px;
        }
        .custom-carousel-indicator {
          background-color: var(--quaternary-bg-color);
          border-radius: 50%;
          width: 15px;
          height: 15px;
          margin: 0 10px;
        }
        .custom-carousel-indicator.active {
          background-color: var(--tertiary-bg-color);
          width: 20px;
          height: 20px;
        }

        @media (min-width: 992px) {
        }
      `}</style>
    </div>
  );
};
