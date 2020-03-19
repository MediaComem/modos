export const Section = props => {
  return (
    <section>
        {props.children}
      <style jsx>
        {`
          section {
            min-height: 650px;
            height: 100vh;
            width: 96%;
            padding: 20px 2%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
        `}
      </style>
    </section>
  );
};
