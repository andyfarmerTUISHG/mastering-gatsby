import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // copy the existings values into it
      ...values,
      // update the new value that change
      // use the name attribute of the input and set it to the value of what the user typer
      [e.target.name]: e.target.value,
    });
  }

  return { values, updateValue };
}