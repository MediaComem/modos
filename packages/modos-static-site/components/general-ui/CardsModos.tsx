import React from 'react';
import {} from 'react-bootstrap';

interface IProps {
  cards: ICardModos[];
  className?: string;
  id?: string;
}

export interface ICardModos {
  imgSrc;
  imgAlt;
  title;
  description;
}

export const CardsModosContainer = (props: IProps) => <div
  className={`items ${props.className}`} id={props.id}>
  {props.cards.map((card, index) => <CardsModosItem
    key={index}
    imgAlt={card.imgAlt}
    imgSrc={card.imgSrc}
    title={card.title}
    description={card.description}>
  </CardsModosItem>)}
  <style jsx>{`
    .items{
      display: flex;
      flex-flow: column;
      width: 100%;
    }
    
    @media (min-width: 992px) {
      .items {
        flex-flow: row;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `}</style>
</div>;

const CardsModosItem = props =>
  <div className='item'>
    <div className='item-pic'>
      <img alt={props.imgAlt} src={props.imgSrc}></img>
    </div>
    <h3>{props.title}</h3>
    <p>{props.description}</p>

    <style jsx>{`
    .item {
      background-color: var(--tertiary-color);
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: space-evenly;
      margin: 5% 0% 5% 0%;
      width: 100%;
      min-height: 50vh;
      box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.1);
      padding: 20px 10%;
    }
    .item h3, p {
      text-align: center;
    }

    .item .item-pic {
      position: relative;
      border-radius: 50%;
      background: white;
      height: 200px;
      width: 200px;      
    }    

    .item .item-pic img {
      position: absolute;
      min-width: 250px;
      left: calc((200px * 0.5) - (250px * 0.5));
      top: -25px;
    }

    @media (min-width: 992px) {
      .item {
        margin: 5% 2% 5% 2%;
        padding: 40px 5% 20px 5%;
        width: 21%;
        min-width: 250px;
        min-height: calc(250px + 200px);
        height:50%;
      }
    }
  `}</style>
  </div>
  ;
