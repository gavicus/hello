import React, { useEffect } from 'react';

import useForm from './CustomHooks';

const EntryForm = ({onDone, data, submitText}) => {

  useEffect(() => {
    if(data){
      setInputs(data.value);
    }
  }, []);

  const submit = fields => {
    onDone(fields);
    clearForm();
  };

  const {inputs, handleInputChange, handleSubmit, clearForm, setInputs} = useForm(submit, {title:'', description:''});

  return (
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='title' placeholder='title' value={inputs.title} onChange={handleInputChange} />
        </div>
        <div>
          <textarea rows="8" cols="60" name='description' placeholder='description' value={inputs.description} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">{ submitText || 'Create' }</button>
        </div>
      </form>
  );
}

export default EntryForm;
