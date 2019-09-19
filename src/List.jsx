import React, { useState, useEffect } from 'react';

import database from './data.js';

const List = ({onView}) => {

  const [entryList, setEntryList] = useState('');
  const [validList, setValidList] = useState(false);

  const db = database();
  const entryDb = db.crud('entry');

  useEffect(() => {
    const fetchData = async () => {
      // "await" means you don't have to do a .then()
      const result = await entryDb.filter( e => true );
      setEntryList(result);

      /* testing...
      const readResult = await entryDb.read(31);
      console.log('readResult', readResult);
      */
    };
    fetchData();
    // the second param to useEffect lists variables to watch
    // when one changes, this function gets called again
  }, [validList]);

  const updateList = () => { setValidList(!validList); };

  const deleteItem = itemId => {
    entryDb.delete(itemId).then(result => {
      updateList();
    });
  };

  return (
    <div>

    { entryList &&
      <table>
      <tbody>
      {
        entryList.map(item => 
          <tr key={item.key}>
            <td>{item.key}</td>
            {typeof item.value === 'string' && 
            <td>{JSON.stringify(item.value)}</td>
            }
            <td className="title-link" onClick={() => onView(item.key)}>{item.value.title}</td>
            <td><button onClick={() => deleteItem(item.key)}>X</button></td>
          </tr>
        )
      }
      </tbody>
      </table>
    }
    </div>
  );
};

export default List;

