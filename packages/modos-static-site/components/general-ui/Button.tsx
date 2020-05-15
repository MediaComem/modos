import React from 'react';

export const Button = props =>
  <button id={props.id} className={props.className}>
    {props.children}
    <style jsx>
      {`
          button {
            border-radius: 3px;
            background: var(--primary-btn-color);
            border: 2px solid var(--primary-btn-color);
            font-size: 1.1em;
            color: var(--tertiary-text-color);
            padding: 0.7em 0.5em;
            text-transform: uppercase;
            font-family: "Gotham Pro Bold"
          }
        `}
    </style>
  </button>
  ;
