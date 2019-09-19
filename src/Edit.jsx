import React from 'react';

import database from './data.js';
import Entry from './Entry.js';
import EntryForm from './EntryForm';

const Edit = ({data, onEditDone}) => {

  const db = database();
  const entryDb = db.crud('entry');

  const submitNewEntry = ({title, description}) => {
    const entry = new Entry();
    entry.setTitle(title);
    entry.setDescription(description);
    entryDb.update(entry, data.key).then(result => {
      onEditDone();
    });
  };

  return (
    <div>
      <EntryForm onDone={submitNewEntry} data={data} submitText="Update" />
      <button onClick={onEditDone}>Cancel</button>
      <p>useful tags:</p>
      <ul style={{marginTop:'5px'}}>
        <li>new line: &lt;br&gt;</li>
        <li>page link: &lt;page-id:text&gt;</li>
      </ul>
    </div>
  );
};

export default Edit;
