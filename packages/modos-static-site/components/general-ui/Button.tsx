export const Button = props => {
  return (
    <button>
      {props.children}
      <style jsx>
        {`
          button {
            border-radius: 5px;
            background: tomato;
            font-size: 1.1em;
            color: white;
            border: none;
            min-height: 37px;
            min-width: 100px;
          }
        `}
      </style>
    </button>
  );
};
