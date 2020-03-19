const Form = props => {
  return (
    <>
      <style jsx>{`
         {
        }
      `}</style>
      <form>{props.children}</form>
    </>
  );
};

const Input = props => {
  return (
    <>
      <style jsx>{`         
          input {
            font-size: 1.1em;
            border-radius: 5px;
            min-height: 35px;
            min-width: 100px;
            border: 1px solid lightgrey;
          }        
      `}</style>
      <input></input>
    </>
  );
};

const Select = props => {
  return (
    <>
      <style jsx>{`
         {
        }
      `}</style>
      <select>
        {props.options.map(option => (
          <option value={option.value}>option.name</option>
        ))}
      </select>
    </>
  );
};

const Checkbox = props => {
  return (
    <>
      <style jsx>{`
         {
        }
      `}</style>
      <input type="checkbox" value={props.val} />
    </>
  );
};

export { Form, Input, Checkbox, Select };
