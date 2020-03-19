export const Button = props => {
  return (
    <button>
      {props.children}
      <style jsx>
        {`
          button {
            border-radius: 3px;
            background: transparent;
            border: 2px solid tomato;
            font-size: 1.1em;
            color: tomato;
            margin: 0 1em;
            padding: 0.25em 1em;
          }
        `}
      </style>
    </button>
  );
};
