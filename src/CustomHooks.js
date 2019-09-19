import { useState } from 'react';

const useForm = (callback, fields) => {
  const [inputs, setInputs] = useState(fields);
  const handleSubmit = event => {
    if (event) { event.preventDefault(); }
    callback(inputs);
  };
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  };
  const clearForm = () => {
    const cleared = {};
    for(var fieldName of Object.keys(inputs)){
      cleared[fieldName] = '';
    }
    setInputs(cleared);
  };
  return { handleSubmit, handleInputChange, clearForm, setInputs, inputs };
};

export default useForm;
