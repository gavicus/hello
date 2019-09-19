import React, { useState, useEffect } from 'react';

import database from './data.js';

const File = () => {
  const [entryList, setEntryList] = useState('');

  const db = database();
  const entryDb = db.crud('entry');

  useEffect(() => {
    const fetchData = async () => {
      const result = await entryDb.filter( e => true );
      setEntryList(result);
    };
    fetchData();
  }, []);

  const download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDataFile = () => {
    // const fileName = 'entries.txt';
    const fileName = 'entries ' + new Date().toLocaleDateString() + '.txt';
    const text = JSON.stringify(entryList);
    download(fileName, text);
  };

  const handleFileLoad = event => {
    const fileText = event.target.result;
    entryDb.updateFromText(fileText);
  };

  const handleFileSelect = event => {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    const file = event.target.files[0];
    if (file) {
      reader.readAsText(file);
      event.target.value = null;
    }
  };

  return (
    <div>
    { entryList &&
    <div>


      <div>
        <button onClick={ downloadDataFile } >download</button>
      </div>

      <div>
        <input id="data-file" type="file" onChange={handleFileSelect} />
      </div>

    </div>
    }
    </div>
  );
};

export default File;
