import React from 'react';

import database from './data.js';
import Entry from './Entry.js';
import EntryForm from './EntryForm';

const Create = ({onCreate}) => {

  const db = database();
  const entryDb = db.crud('entry');

  const submitNewEntry = ({title, description}) => {
    const entry = new Entry();
    entry.setTitle(title);
    entry.setDescription(description);
    entryDb.create(entry).then(result => {
      onCreate(result.key);
    });
  }

  return (
    <div>
      
      <EntryForm onDone={submitNewEntry} />

    </div>
  );
};

export default Create;

