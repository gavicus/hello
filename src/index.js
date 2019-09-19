import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './style/index.scss';
import Nav from './Nav';
import Edit from './Edit';
import List from './List';
import Create from './Create';
import View from './View';
import File from './File';

const Main = () => {
  const startPage = 'view';
  const startKey = 1;
  const caption = "";
  const tabs = [ 'home', 'view', 'list', 'create', 'file' ];
  const [ page, setPage ] = useState(startPage);
  const [ editData, setEditData ] = useState(null);
  const [ viewKey, setViewKey ] = useState(startKey);

  const handleEdit = data => {
    setEditData(data);
    setPage('edit');
  };

  const handleEditDone = () => {
    setViewKey(editData.key);
    setPage('view');
  };

  const handleView = key => {
    setViewKey(parseInt(key));
    setPage('view');
  };

  const handleCreate = newId => {
    handleView(newId);
  };

  const handleNavChange = pageId => {
    if (pageId === 'home') {
      return handleView(startKey);
    }
    setPage(pageId);
  };

  return (
    <div>
      <h3>{caption}</h3>
      <Nav tabs={tabs} onChange={handleNavChange} />
      <div className="page-wrapper">
        { page === 'edit' && <Edit data={editData} onEditDone={handleEditDone}/> }
        { page === 'view' && <View onEdit={handleEdit} viewKey={viewKey} onChangeView={handleView} /> }
        { page === 'list' && <List onView={handleView}/> }
        { page === 'create' && <Create onCreate={handleCreate} /> }
        { page === 'file' && <File /> }
      </div>
    </div>
  );
};

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
