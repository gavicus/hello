import React, { useState, useEffect } from 'react';

import database from './data.js';
import Entry from './Entry.js';

const View = ({viewKey, onEdit, onChangeView}) => {
  const [ data, setData ] = useState({});

  const db = database();
  const entryDb = db.crud('entry');

  useEffect(() => {
    const fetchData = async () => {
      if(!viewKey){ return; }
      const result = await entryDb.read(viewKey);
      setData(result);
    };
    fetchData();
  }, [viewKey]);

  const handleLinkClick = id => {
    onChangeView(id);
  };

  const getBody = (text) => {

    const parts = text
      .replace(/</g, '|<')
      .replace(/>/g, '>|')
      .split('|');

    let keys = 0;

    const altered = parts.map(part => {
      if (/^<(\d+):([\w\s]+)>$/.exec(part)) { // if like "<1:text>"
        const [id,text] = part.substr(1,part.length-2).split(':');
        return (
          <button className="link-button" onClick={() => handleLinkClick(id)} key={++keys}>
            {text}
          </button>
        );
      } else if (/^<br>$/.exec(part)) { // if <br>
        return <br key={++keys}/>;
      } else {
        return (<span key={++keys}>{part}</span>);
      }
    });

    return altered;
  };

  return (
    <div className="view-wrapper">
      { data && data.value &&
        <div>

        <button onClick={() => onEdit(data)}>edit</button>

        <ul className="detail-list">
          <li> <label>title:</label><span>{data.value.title}</span> </li>
          <li> <label>id:</label><span>{data.key}</span> </li>
          <li>
            <label>content:</label>
            <div className="content-box">
              {getBody(data.value.description)}
            </div>
          </li>
        </ul>

        </div>
      }
    </div>
  );
};

export default View;
