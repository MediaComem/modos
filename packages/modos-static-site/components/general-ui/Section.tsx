import React from 'react';

export const Section = props =>
  <section id={props.id} className={props.className}>
    {props.children}
    <style jsx>
      {`
          section {
            min-height: 650px;
            width: 96%;
            padding: 20px 2%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        `}
    </style>
  </section>
  ;
